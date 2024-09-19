import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const AddItem = ({ onAddItem }) => {
  const [costPrice, setCostPrice] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const handleAddItem = () => {
    // Логирование значений перед парсингом
    console.log('Входные значения:', { name, costPrice, deliveryPrice, quantity, weight, salePrice });

    const parsedCostPrice = parseFloat(costPrice);
    const parsedDeliveryPrice = parseFloat(deliveryPrice);
    const parsedQuantity = parseInt(quantity, 10);
    const parsedWeight = parseFloat(weight);
    const parsedSalePrice = parseFloat(salePrice);

    if (
      !name ||
      isNaN(parsedCostPrice) || !isFinite(parsedCostPrice) ||
      isNaN(parsedDeliveryPrice) || !isFinite(parsedDeliveryPrice) ||
      isNaN(parsedQuantity) || !isFinite(parsedQuantity) ||
      isNaN(parsedWeight) || !isFinite(parsedWeight) ||
      isNaN(parsedSalePrice) || !isFinite(parsedSalePrice)
    ) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля корректно.');
      return;
    }

    const item = {
      name,
      cost_price: parsedCostPrice,
      delivery_price: parsedDeliveryPrice,
      quantity: parsedQuantity,
      weight: parsedWeight,
      sale_price: parsedSalePrice,
    };

    console.log('Добавленный товар:', item); // Лог добавленного товара

    onAddItem(item);

    // Сброс полей ввода
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
