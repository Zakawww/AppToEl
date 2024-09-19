import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert,ScrollView  } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AddItem from './AddItem';
import { setupDatabase, addItemToDatabase, getItemsFromDatabase } from '../database/database';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    console.log('Setting up database...');
    setupDatabase();
    console.log('Fetching items...');
    fetchItems();
    console.log('Fetching items.Finish.');
  }, []);

  const fetchItems = useCallback(() => {
    getItemsFromDatabase((fetchedItems) => {
      console.log('Fetched items items items items:');
      console.log('Fetched items:', fetchedItems);
      setItems(fetchedItems);
    });
  }, []);

  const handleAddItem = useCallback((item) => {
    addItemToDatabase(item, () => {
      console.log('Item added: added added added added added');
      console.log('Item added:', item);
      fetchItems();
      setShowAddItem(false);
      console.log('Item false:');
    });
  }, [fetchItems]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Склад товаров</Text>
      <FlatList
        data={items}
//        keyExtractor={(item) => item.id.toString()}
        keyExtractor={(item) => {
          const key = item.id.toString();
          console.log('Key for item:', key); // Лог ключа
          return key;
        }}
        renderItem={({ item }) => {

          console.log('Получен item:', item); // Лог для проверки item
          console.log('Получен id:', item.id); // Лог для проверки item
          console.log('Получен name:', item.name); // Лог для проверки item
          console.log(<View style={styles.item}>
                                    <Text>Название: {item.name}</Text>
                                    <Text>Себестоимость: {item.cost_price}</Text>
                                    <Text>Цена доставки: {item.delivery_price}</Text>
                                    <Text>Количество: {item.quantity}</Text>
                                    <Text>Вес: {item.weight} кг</Text>
                                    <Text>Цена продажи: {item.sale_price}</Text>
                                  </View>)
          return (
            <View style={styles.item}>
              <Text>Название: {item.name}</Text>
              <Text>Себестоимость: {item.cost_price}</Text>
              <Text>Цена доставки: {item.delivery_price}</Text>
              <Text>Количество: {item.quantity}</Text>
              <Text>Вес: {item.weight} кг</Text>
              <Text>Цена продажи: {item.sale_price}</Text>
            </View>
          );
        }}
      />

      {showAddItem ? (
        <>
          <Text>Рендер компонента AddItem</Text> {/* Добавлено для теста */}
          <AddItem onAddItem={handleAddItem} />
        </>
      ) : (
        <>
          <Button title="Добавить товар" onPress={() => {
            console.log('Кнопка "Добавить товар" нажата');
            setShowAddItem(true);
          }} />
        </>
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

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    padding: 16,
//  },
//  header: {
//    fontSize: 24,
//    marginBottom: 16,
//    textAlign: 'center',
//  },
//  item: {
//    padding: 16,
//    borderBottomWidth: 1,
//    borderBottomColor: '#ccc',
//    height: 100,
//  },
//  input: {
//    borderWidth: 1,
//    borderColor: '#ccc',
//    padding: 8,
//    marginVertical: 8,
//    borderRadius: 4,
//    flex: 1,
//  },
//  filterContainer: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    marginBottom: 16,
//  },
//});
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue', // Добавьте цвет фона для проверки
  },
  header: {
    backgroundColor: '#0073e5',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: 'red', // Измените цвет текста для проверки
  },
  item: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      height: 200,
    },
  input: {
    borderWidth: 1,
    borderColor: 'green', // Измените цвет границы
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'red', // Измените цвет фона для проверки
  },
});



export default InventoryList;
