import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
const db = firebase.firestore();
const app = db.app;

export function createUser(uid, data) {
  return db
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = db.collection('sites').doc();
  site.set(data);

  return site;
}

export async function deleteSite(id) {
  db.collection('sites').doc(id).delete();
  const snapshot = await db
    .collection('feedback')
    .where('siteId', '==', id)
    .get();

  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function updateSite(id, newValues) {
  return db.collection('sites').doc(id).update(newValues);
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
