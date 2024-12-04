// OrderReceiptPDF.js
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

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

// Fungsi untuk format nama file
export const getFileName = (noMeja) => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `Pesanan-Meja-${noMeja}-${day}${month}${year}-${hours}${minutes}`;
};

// Styles tidak berubah
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FAF9F6',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #4A4A4A',
    backgroundColor: '#F8EDEB',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: '#4A4A4A',
    fontWeight: 'bold',
  },
  restaurantName: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6D6875',
    marginTop: 5,
  },
  orderInfo: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: '40%',
  },
  value: {
    color: '#333',
    width: '60%',
    textAlign: 'right',
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#DDD',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  columnItem: {
    flex: 2,
    fontWeight: 'bold',
    color: '#333',
  },
  columnQty: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  columnPrice: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
  },
  columnTotal: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
  },
  notes: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 2,
    marginLeft: 10,
  },
  total: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: '40%',
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  totalValue: {
    width: '30%',
    textAlign: 'right',
    color: '#4A4A4A',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#6D6875',
  },
});

export const OrderReceipt = ({ orderData, orderItems }) => { 

  const totalFinalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Struk Pesanan</Text>
        <Text style={styles.restaurantName}>Café Cerita</Text>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.label}>No. Meja:</Text>
          <Text style={styles.value}>{orderData.no_meja}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.label}>Tanggal:</Text>
          <Text style={styles.value}>{formatDate(new Date())}</Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>Belum Bayar</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnItem}>Item</Text>
          <Text style={styles.columnQty}>Qty</Text>
          <Text style={styles.columnPrice}>Harga</Text>
          <Text style={styles.columnTotal}>Total</Text>
        </View>

        {orderItems.map((item, index) => (
          <View key={index}>
            <View style={styles.tableRow}>
              <Text style={styles.columnItem}>{item.name}</Text>
              <Text style={styles.columnQty}>{item.quantity}</Text>
              <Text style={styles.columnPrice}>
                {item.price.toLocaleString('id-ID')}
              </Text>
              <Text style={styles.columnTotal}>
                {item.TotalPrice.toLocaleString('id-ID')}
              </Text>
            </View>
            {item.notes && (
              <Text style={styles.notes}>Catatan: {item.notes}</Text>
            )}
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
      </View>

      <View style={styles.footer}>
        <Text>Terima kasih telah bersantap di Restaurant kami.</Text>
        <Text>Kami mohon kesediaan Anda untuk menyerahkan struk ini</Text>
        <Text>kepada kasir setelah selesai untuk melunasi pembayaran.</Text>
        <Text>Semoga Anda menikmati hidangan kami, dan kami nantikan</Text>
        <Text>kunjungan Anda kembali.</Text>
      </View>
    </Page>
  </Document>
);
}

const OrderReceiptPDF = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    const storedOrderItems = JSON.parse(localStorage.getItem('orderItems'));

    setOrderData(storedOrderData);
    setOrderItems(storedOrderItems);
  }, []);


  return (
    <motion.div 
      className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <OrderReceipt orderData={orderData} orderItems={orderItems} />
      </PDFViewer>
    </motion.div>
  );
};

export default OrderReceiptPDF;