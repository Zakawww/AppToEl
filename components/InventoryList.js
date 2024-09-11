import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AddItem from './AddItem';
import { setupDatabase, addItemToDatabase, getItemsFromDatabase } from '../database/database';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setupDatabase();
    fetchItems();
  }, []);

  const fetchItems = () => {
    getItemsFromDatabase((fetchedItems) => {
      setItems(fetchedItems);
    });
  };

  const handleAddItem = (newItem) => {
    addItemToDatabase(newItem, () => {
      fetchItems();
      setShowAddItem(false);
    });
  };

  const handleSortByPrice = () => {
    const sortedItems = [...items].sort((a, b) => b.sale_price - a.sale_price);
    setItems(sortedItems);
  };

  const handleFilterByPrice = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (isNaN(min) || isNaN(max)) {
      Alert.alert('Ошибка', 'Введите корректные числовые значения для фильтра.');
      return;
    }

    const filteredItems = items.filter(item =>
      item.sale_price >= min && item.sale_price <= max
    );
    setItems(filteredItems);
  };

  const resetFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    fetchItems(); // Fetch all items again
  };

  const chartData = useMemo(() => ({
    labels: items.map(item => item.name),
    datasets: [
      {
        data: items.map(item => item.sale_price),
      },
    ],
  }), [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Склад товаров</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Название: {item.name}</Text>
            <Text>Себестоимость: {item.cost_price}</Text>
            <Text>Цена доставки: {item.delivery_price}</Text>
            <Text>Количество: {item.quantity}</Text>
            <Text>Вес: {item.weight} кг</Text>
            <Text>Цена продажи: {item.sale_price}</Text>
          </View>
        )}
      />
      {showAddItem ? (
        <AddItem onAddItem={handleAddItem} />
      ) : (
        <Button title="Добавить товар" onPress={() => setShowAddItem(true)} />
      )}
      <Button title="Сортировать по цене продажи" onPress={handleSortByPrice} />
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Мин. цена"
          value={minPrice}
          keyboardType="numeric"
          onChangeText={setMinPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Макс. цена"
          value={maxPrice}
          keyboardType="numeric"
          onChangeText={setMaxPrice}
        />
        <Button title="Применить фильтр" onPress={handleFilterByPrice} />
        <Button title="Сбросить фильтр" onPress={resetFilter} />
      </View>
      <LineChart
        data={chartData}
        width={320}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default InventoryList;
