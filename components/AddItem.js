import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddItem = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const handleAddItem = () => {
    if (!name || isNaN(costPrice) || isNaN(deliveryPrice) || isNaN(quantity) || isNaN(weight) || isNaN(salePrice)) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля корректно.');
      return;
    }

    onAddItem({
      name,
      cost_price: parseFloat(costPrice),
      delivery_price: parseFloat(deliveryPrice),
      quantity: parseInt(quantity, 10),
      weight: parseFloat(weight),
      sale_price: parseFloat(salePrice),
    });

    // Reset the form
    setName('');
    setCostPrice('');
    setDeliveryPrice('');
    setQuantity('');
    setWeight('');
    setSalePrice('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Название товара"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Себестоимость"
        value={costPrice}
        keyboardType="numeric"
        onChangeText={setCostPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Цена доставки"
        value={deliveryPrice}
        keyboardType="numeric"
        onChangeText={setDeliveryPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Количество"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Вес"
        value={weight}
        keyboardType="numeric"
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Цена продажи"
        value={salePrice}
        keyboardType="numeric"
        onChangeText={setSalePrice}
      />
      <Button title="Добавить товар" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});

export default AddItem;
