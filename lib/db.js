import app from "@/lib/firebase";

const firestore = app.firestore();

export async function createUser(uid, data) {
  const user = await firestore.collection("users").doc(uid)
  user.set({uid, ...data}, {merge: true});

  return user;
}

export async function createOperator(data) {
  const operator = await firestore.collection('operators').doc();
  operator.set(data, {merge: true});

  return operator;
}

export async function createNewEquipment(data) {
  const equipment = await firestore.collection('equipments').doc();
  equipment.set(data, {merge: true});

  return equipment;
}

export async function deleteUser(id) {
  await firestore.collection('users').doc(id).delete();
  const snapshot = await firestore
      .collection('operators')
      .where('userId', '==', id)
      .get();

  const batch = await firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function deleteOperator(id) {
  await firestore.collection('operators').doc(id).delete();
  const snapshot = await firestore
      .collection('operators')
      .where('id', '==', id)
      .get();

  const batch = await firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function deleteEquipment(id) {
  await firestore.collection('equipments').doc(id).delete();
  const snapshot = await firestore
      .collection('equipments')
      .where('id', '==', id)
      .get();

  const batch = await firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}


export async function updateUser(id, newValues) {
  return firestore.collection('users').doc(id).update(newValues);
}

export async function updateEquipment(id, newValues) {
  return firestore.collection('equipments').doc(id).update(newValues);
}


export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}

export function updateFeedback(id, newValues) {
  return firestore.collection('feedback').doc(id).update(newValues);
}
