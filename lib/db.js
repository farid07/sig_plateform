import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

const db = firebase.firestore();
const app = db.app;

// export function createUser(uid, data) {
//   return db
//     .collection('users')
//     .doc(uid)
//     .set({ uid, ...data }, { merge: true });
// }

export function createUser(data) {
  const user = db.collection('users').doc();
  user.set(data, {merge: true});

  return user;
}

export function createOperator(data) {
  const operator = db.collection('operators').doc();
  operator.set(data);

  return operator;
}

export async function deleteUser(id) {
  db.collection('users').doc(id).delete();
  const snapshot = await db
      .collection('operators')
      .where('userId', '==', id)
      .get();

  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function updateUser(id, newValues) {
  return db.collection('users').doc(id).update(newValues);
}

export function createFeedback(data) {
  return db.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return db.collection('feedback').doc(id).delete();
}

export function updateFeedback(id, newValues) {
  return db.collection('feedback').doc(id).update(newValues);
}
