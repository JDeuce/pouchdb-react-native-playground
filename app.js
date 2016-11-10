import assert from 'assert';
import 'babel-polyfill';
import 'react-native-mock/mock';
import PouchDB from 'pouchdb-react-native';

(async () => {
  const sourceDb1 = new PouchDB('sourceDb1');
  const sourceDb2 = new PouchDB('sourceDb2');
  const localDest = new PouchDB('localDest');
  const localDest2 = new PouchDB('localDest2');

  console.log('Inserting documents...');
  await Promise.all([
    sourceDb1.put({ _id: '1', foo: 'bar' }),
    sourceDb2.put({ _id: '1', bar: 'baz' })
  ]);

  console.log('Replicating to local destination');
  await sourceDb1.replicate.to(localDest);
  await sourceDb2.replicate.to(localDest);

  console.log('Replicating to local destination2');
  await sourceDb2.replicate.to(localDest2);
  await sourceDb1.replicate.to(localDest2);

  console.log('Fetching docs');
  const [
    sourceDoc1,
    sourceDoc2,
    destDoc1,
    destDoc2,
  ] = await Promise.all([
    sourceDb1.get('1'),
    sourceDb2.get('1'),
    localDest.get('1'),
    localDest2.get('1'),
  ]);

  console.log('Asserting');

  console.log(destDoc1._rev, destDoc2._rev);

  assert.notEqual(sourceDoc1._rev, sourceDoc2._rev,
      'Source docs need different revs for test to work');
  assert.equal(destDoc1._rev, destDoc2._rev,
      'Destination docs have different revs');

})();
