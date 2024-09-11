import * as SQLite from 'expo-sqlite';

// Откройте или создайте базу данных
const db = SQLite.openDatabase('mydatabase.db');

// Пример функции для создания таблицы
const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cost_price REAL, delivery_price REAL, quantity INTEGER, weight REAL, sale_price REAL);',
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.log('Error creating table:', error)
    );
  });
};

// Пример функции для добавления элемента
const addItem = (item) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, cost_price, delivery_price, quantity, weight, sale_price) VALUES (?, ?, ?, ?, ?, ?);',
      [item.name, item.cost_price, item.delivery_price, item.quantity, item.weight, item.sale_price],
      () => console.log('Item added successfully'),
      (tx, error) => console.log('Error adding item:', error)
    );
  });
};

// Вызовите функции при необходимости
createTable();
addItem({ name: 'Example Item', cost_price: 10.0, delivery_price: 2.0, quantity: 5, weight: 1.2, sale_price: 15.0 });
