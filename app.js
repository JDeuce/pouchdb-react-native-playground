import 'babel-polyfill';
import 'react-native-mock/mock';
import PouchDB from 'pouchdb-react-native';

(async () => {
  const db = new PouchDB('mydb');
  const doc = await db.put({ _id: '1', foo: 'bar' });
  console.log(await db.get('1'));
})();
