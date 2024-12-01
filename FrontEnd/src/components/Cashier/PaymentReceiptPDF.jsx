import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { motion } from 'framer-motion';

// Fungsi untuk format tanggal
const formatDate = (date) => {
  const d = new Date(date);
  const padZero = (num) => String(num).padStart(2, '0');
  const day = padZero(d.getDate());
  const month = padZero(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const styles = StyleSheet.create({
  // Tambahkan style sesuai kebutuhan
  page: { padding: 30 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  restaurantName: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  receiptInfo: { marginBottom: 20 },
  receiptInfoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontWeight: 'bold' },
  value: {},
  table: { marginTop: 10 },
  tableHeader: { flexDirection: 'row', borderBottom: '1px solid black', paddingBottom: 5 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  columnItem: { flex: 2 },
  columnQty: { flex: 1, textAlign: 'center' },
  columnPrice: { flex: 1, textAlign: 'center' },
  columnTotal: { flex: 1, textAlign: 'center' },
  total: { marginTop: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontWeight: 'bold' },
  footer: { marginTop: 20, textAlign: 'center' },
});

export const PaymentReceipt = ({ receiptData, receiptItems }) => {
  const totalFinalPrice = receiptItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  const discountAmount = receiptData.discount || 0;
  // Perhitungan diskon yang benar
  const finalPriceAfterDiscount = totalFinalPrice - (totalFinalPrice * discountAmount) / 100;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Struk Pembayaran</Text>
          <Text style={styles.restaurantName}>King Coffee</Text>
        </View>

        <View style={styles.receiptInfo}>
          <View style={styles.receiptInfoRow}>
            <Text style={styles.label}>No. Transaksi:</Text>
            <Text style={styles.value}>{receiptData.transaction_id || 'N/A'}</Text>
          </View>
          <View style={styles.receiptInfoRow}>
            <Text style={styles.label}>No. Meja:</Text>
            <Text style={styles.value}>{receiptData.table_number || 'N/A'}</Text>
          </View>
          <View style={styles.receiptInfoRow}>
            <Text style={styles.label}>Tanggal:</Text>
            <Text style={styles.value}>{formatDate(receiptData.date || new Date())}</Text>
          </View>
          <View style={styles.receiptInfoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{receiptData.status || 'N/A'}</Text>
          </View>
          <View style={styles.receiptInfoRow}>
            <Text style={styles.label}>Metode Pembayaran:</Text>
            <Text style={styles.value}>{receiptData.payment_method || 'N/A'}</Text>
          </View>
          <View style={styles.receiptInfoRow}>
            <Text style={styles.label}>Diskon:</Text>
            <Text style={styles.value}>
              {discountAmount ? `${discountAmount}%` : '0%'}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.columnItem}>Item</Text>
            <Text style={styles.columnQty}>Qty</Text>
            <Text style={styles.columnPrice}>Harga</Text>
            <Text style={styles.columnTotal}>Total</Text>
          </View>

          {receiptItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.columnItem}>{item.menu_name || 'Unknown Item'}</Text>
              <Text style={styles.columnQty}>{item.quantity || 0}</Text>
              <Text style={styles.columnPrice}>
                {item.price ? item.price.toLocaleString('id-ID') : '0'}
              </Text>
              <Text style={styles.columnTotal}>
                {item.price && item.quantity ? (item.price * item.quantity).toLocaleString('id-ID') : '0'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>
              Rp {totalFinalPrice.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Dibayar:</Text>
            <Text style={styles.totalValue}>
              Rp {receiptData.paid_amount ? receiptData.paid_amount.toLocaleString('id-ID') : '0'}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Setelah Diskon:</Text>
            <Text style={styles.totalValue}>
              Rp {finalPriceAfterDiscount.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Kembalian:</Text>
            <Text style={styles.totalValue}>
              Rp {receiptData.change ? receiptData.change.toLocaleString('id-ID') : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Terima kasih atas pembayaran Anda.</Text>
          <Text>Struk ini adalah bukti pembayaran yang sah.</Text>
          <Text>Semoga Anda menikmati hidangan kami!</Text>
        </View>
      </Page>
    </Document>
  );
};

const PaymentReceiptPDF = () => {
  const [receiptData, setReceiptData] = useState({});
  const [receiptItems, setReceiptItems] = useState([]);

  useEffect(() => {
    const storedReceiptData = JSON.parse(localStorage.getItem('orderData')) || {};
    const storedReceiptItems = JSON.parse(localStorage.getItem('orderItems')) || {};

    const receiptData = {
      transaction_id: storedReceiptData.NoTransaksi || 'N/A',
      table_number: storedReceiptData.NoTabel || 'N/A',
      date: new Date(),
      payment_method: storedReceiptData.paymentMethod || 'N/A',
      paid_amount: storedReceiptData.paidAmount || 0,
      change: storedReceiptData.change || 0,
      discount: storedReceiptData.discount || 0,  // Menambahkan discount di sini
      status: storedReceiptData.status || 'N/A',
    };

    setReceiptData(receiptData);
    setReceiptItems(storedReceiptItems.MenuDetails || []);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <PaymentReceipt receiptData={receiptData} receiptItems={receiptItems} />
      </PDFViewer>
    </motion.div>
  );
};

export default PaymentReceiptPDF;
