import * as SQLite from 'expo-sqlite';

// Создаем или открываем базу данных
const db = SQLite.openDatabase('inventory.db');

// Функция для создания таблицы товаров
export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cost_price REAL, delivery_price REAL, quantity INTEGER, weight REAL, sale_price REAL);'
    );
  });
};

// Функция для добавления товара
export const addItemToDatabase = (item, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, cost_price, delivery_price, quantity, weight, sale_price) VALUES (?, ?, ?, ?, ?, ?);',
      [item.name, item.cost_price, item.delivery_price, item.quantity, item.weight, item.sale_price],
      (_, result) => callback(result),
      (_, error) => console.error(error)
    );
  });
};

// Функция для получения всех товаров
export const getItemsFromDatabase = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.error(error)
    );
  });
};
