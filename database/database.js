import SQLite from 'react-native-sqlite-storage';
//import SQLite from 'expo-sqlite';
const db = SQLite.openDatabase({ name: 'my.db', location: 'default' });


export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cost_price INTEGER,
        delivery_price INTEGER,
        quantity INTEGER,
        weight INTEGER,
        sale_price INTEGER
      );`,
      [],
      () => console.log('Таблица создана успешно'),
      (tx, error) => {
        console.error('Ошибка при создании таблицы:', error);
        return true;
      }
    );
  });
};

export const addItemToDatabase = (item, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO items (name, cost_price, delivery_price, quantity, weight, sale_price) VALUES (?, ?, ?, ?, ?, ?);',
      [item.name, item.cost_price, item.delivery_price, item.quantity, item.weight, item.sale_price],
      () => {
        console.log('Item added successfully');
        callback();
      },
      (tx, error) => {
        console.error('Error adding item:', error);
        return true;
      }
    );
  });
};

const deleteAllItemsFromDatabase = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM my.db', // Замените "items" на имя вашей таблицы
      [],
      (_, result) => {
        console.log('Все данные удалены:', result);
        callback();
      },
      (_, error) => {
        console.error('Ошибка при удалении данных:', error);
      }
    );
  });
};

export const getItemsFromDatabase = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM items;',
      [],
      (tx, results) => {
        const items = [];
        for (let i = 0; i < results.rows.length; i++) {
          items.push(results.rows.item(i));
        }
        callback(items);
      },
      (tx, error) => {
        console.error('Error fetching items:', error);
        return true;
      }
    );
  });
};
