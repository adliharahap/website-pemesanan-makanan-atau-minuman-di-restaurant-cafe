const db = require("../../database/databases");

const handlePaymentTransaksion = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== 'cashier') {
      return res.status(403).json({ message: 'Akses ditolak, hanya cashier yang dapat mengakses ini' });
    }

    const {
      paymentMethod,
      total,
      discount = 0,
      paidAmount,
      change,
      NoTransaksi,
      CashierName,
      status,
      waiterName,
      NoTabel,
      menuDetails,
    } = req.body.dataTransaksi;

    if (!NoTransaksi || NoTransaksi.trim() === '') {
      return res.status(400).json({ message: 'Transaction ID (NoTransaksi) tidak boleh kosong.' });
    }

    // Set default value untuk discount jika tidak ada atau nilainya bukan string
    const formattedDiscount = discount && typeof discount === 'string' ? discount.trim() : '0';

    // Pastikan discount adalah angka
    if (isNaN(Number(formattedDiscount))) {
      return res.status(400).json({ message: 'Nilai discount harus berupa angka.' });
    }

    const menuDetailsString = JSON.stringify(menuDetails); // Ubah menjadi string agar dapat disimpan di kolom JSON

    // Query untuk menyimpan transaksi
    const insertQuery = `
      INSERT INTO transaction_history (
        transaction_id, 
        table_number, 
        payment_method, 
        total_amount, 
        discount, 
        amount_received, 
        change_amount,
        cashier_name, 
        waiter_name, 
        status, 
        menu_details
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const insertValues = [
      NoTransaksi,
      NoTabel,
      paymentMethod,
      total,
      discount,
      paidAmount,
      change,
      CashierName,
      waiterName,
      status,
      menuDetailsString,
    ];

    db.query(insertQuery, insertValues, async (err, result) => {
      if (err) {
        console.error('Error saat menyimpan transaksi:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan transaksi.', error: err });
      }

      if (result.affectedRows > 0) {
        // Jika insert berhasil, dapatkan table_id berdasarkan table_number
        const selectTableIdQuery = `SELECT table_id FROM tables WHERE table_number = ?;`;
        db.query(selectTableIdQuery, [NoTabel], async (err, tableRows) => {
          if (err) {
            console.error('Error saat mencari table_id:', err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mencari table_id.', error: err });
          }

          if (tableRows.length === 0) {
            return res.status(404).json({ message: 'Tabel tidak ditemukan.' });
          }

          const tableId = tableRows[0].table_id;

          // Lakukan operasi tambahan
          const deleteOrderQuery = `DELETE FROM orders WHERE table_id = ?;`;
          db.query(deleteOrderQuery, [tableId], (err) => {
            if (err) {
              console.error('Error saat menghapus data order:', err);
              return res.status(500).json({ message: 'Kesalahan saat menghapus data order.', error: err });
            }

            const updateTableStatusQuery = `UPDATE tables SET status = 'available' WHERE table_id = ?;`;
            db.query(updateTableStatusQuery, [tableId], (err) => {
              if (err) {
                console.error('Error saat memperbarui status meja:', err);
                return res.status(500).json({ message: 'Kesalahan saat memperbarui status meja.', error: err });
              }

              // Jika semua berhasil
              return res.status(201).json({
                message: 'Transaksi berhasil disimpan, data order dihapus, dan status meja diperbarui.',
                transactionId: NoTransaksi,
              });
            });
          });
        });
      } else {
        // Jika insert gagal
        return res.status(400).json({ message: 'Gagal menyimpan transaksi.' });
      }
    });
  } catch (error) {
    console.error('Terjadi kesalahan server:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.', error });
  }
};

module.exports = { handlePaymentTransaksion };
