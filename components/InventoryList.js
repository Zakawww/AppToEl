import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AddItem from './AddItem';
import { setupDatabase, addItemToDatabase, getItemsFromDatabase, deleteAllItemsFromDatabase  } from '../database/database';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

//  useEffect(() => {
//    console.log('Setting up database...');
//    setupDatabase();
//    fetchItems();
//  }, []);

   useEffect(() => {
     getItemsFromDatabase((fetchedItems) => {
       console.log('Fetched items from database:', fetchedItems);
       console.log('Fetched items from database:777777777777777777777777777777', fetchedItems);
       setItems(fetchedItems);
     });
   }, []);

//  useEffect(() => {
//    console.log('Setting up database...');
//    setupDatabase();
//    console.log('Adding test item...');
//    const testItem = {
//      name: 'Test Item',
//      cost_price: 10,
//      delivery_price: 2,
//      quantity: 5,
//      weight: 1,
//      sale_price: 15
//    };
//    addItemToDatabase(testItem, fetchItems);  // Добавляем элемент сразу после создания таблицы
//  }, []);

  const fetchItems = useCallback(() => {
    console.log('Fetching items...');
    getItemsFromDatabase((fetchedItems) => {
      console.log('Fetched items:', fetchedItems);
      console.log('Fetched items8888888888888888888888888:', fetchedItems);
      setItems(fetchedItems);
    });
  }, []);

  const handleAddItem = useCallback((item) => {
    addItemToDatabase(item, () => {
      console.log('Item added:', item);
      fetchItems();
      setShowAddItem(false);
    });
  }, [fetchItems]);

  const handleSortByPrice = () => {
    const sortedItems = [...items].sort((a, b) => b.sale_price - a.sale_price);
    setItems(sortedItems);
  };

  const handleFilterByPrice = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      const filteredItems = items.filter(item => item.sale_price >= min && item.sale_price <= max);
      setItems(filteredItems);
    } else {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректные значения для фильтра.');
    }
  };

  const resetFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    fetchItems();
  };

  const chartData = useMemo(() => ({
    labels: items.map(item => item.name),
    datasets: [
      {
        data: items.map(item => item.sale_price),
      },
    ],
  }), [items]);

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item);
    
    console.log(<View key={item.id} style={styles.item}>
      <Text>Название: {item.name}</Text>
      <Text>Себестоимость: {item.cost_price}</Text>
      <Text>Цена доставки: {item.delivery_price}</Text>
      <Text>Количество: {item.quantity}</Text>
      <Text>Вес: {item.weight} кг</Text>
      <Text>Цена продажи: {item.sale_price}</Text>
    </View>);
    console.log('=========================================');
    console.log(<FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />);
    return (
    <View key={item.id} style={styles.item}>
      <Text>Название: {item.name}</Text>
      <Text>Себестоимость: {item.cost_price}</Text>
      <Text>Цена доставки: {item.delivery_price}</Text>
      <Text>Количество: {item.quantity}</Text>
      <Text>Вес: {item.weight} кг</Text>
      <Text>Цена продажи: {item.sale_price}</Text>
    </View>
  );};

  console.log('Items data 11111:', items);
  console.log('Rendering InventoryList...');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Склад товаров</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {showAddItem ? (
        <AddItem onAddItem={handleAddItem} />
      ) : (
        <Button title="Добавить товар" onPress={() => setShowAddItem(true)} />
      )}
      <Button title="Сортировать по цене продажи" onPress={handleSortByPrice} />
      <Button title="Удалить все товары" onPress={() => {
        deleteAllItemsFromDatabase(() => {
          fetchItems();});
      }} />
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
    backgroundColor: 'green',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: 'red',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
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
