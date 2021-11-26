import {compareAsc, compareDesc, parseISO} from 'date-fns';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
// import {db, auth} from "@/lib/firebase-admin";
const db = firebase.firestore();
const app = db.app;

// export const createUserWithEmailAndPassword = ({email, password}) => {
//   return auth.createUser(
//       {
//         email: email,
//         emailVerified: true,
//         phoneNumber: "+11234567890",
//         password: password,
//         displayName: "John Doe",
//         photoURL: "https://unsplash.com/photos/JoKS3XweV50",
//         disabled: false,
//         customClaims: {isAdmin: true, isSuperAdmin: true, roles: ["ADMINISTRATION","PROSPECT","CONFIGURATION","SUBSCRIPTION","MESSAGE","CLAIM","RETURN_CUSTOMER"]}
//       }
//
//   ).then(() => {
//     console.log("Created user");
//   });
//   // return auth().createUserWithEmailAndPassword(email, password).then(async (response) => {
//   //   await createUser(response.uid, {isAdmin: true, isSuperAdmin: true, roles: ["ADMINISTRATION","PROSPECT","CONFIGURATION","SUBSCRIPTION","MESSAGE","CLAIM","RETURN_CUSTOMER"]})
//   // });
// }
// export async function getCollections() {
//   const snapshot = await db.collection('users').get();
//
//   const users = [];
//
//   snapshot.forEach((doc) => {
//     users.push({ id: doc.id, ...doc.data() });
//   });
//
//   return { users };
// }

export async function getAllFeedback(siteId, route) {
  try {
    let ref = db
        .collection('feedback')
        .where('siteId', '==', siteId)
        .where('status', '==', 'active');

    if (route) {
      ref = ref.where('route', '==', route);
    }

    const snapshot = await ref.get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getSite(siteId) {
  const doc = await db.collection('sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };

  return {site};
}

export async function getOperators() {
  const snapshot = await db.collection('operators').get();

  const operators = [];

  snapshot.forEach((doc) => {
    operators.push({id: doc.id, ...doc.data()});
  });

  return {operators};
}

export async function getUsers() {
  const snapshot = await db.collection('users').get();

  const users = [];

  snapshot.forEach((doc) => {
    users.push({id: doc.id, ...doc.data()});
  });

  return {users};
}

export async function getUserOperators(uid) {
  const snapshot = await db
      .collection('operators')
      .where('userId', '==', uid)
      .get();

  const operators = [];

  snapshot.forEach((doc) => {
    operators.push({id: doc.id, ...doc.data()});
  });

  operators.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return {operators};
}

export async function getAllFeedbackForSites(uid) {
  const { sites } = await getUserSites(uid);

  if (!sites.length) {
    return { feedback: [] };
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await db
    .collection('feedback')
    .where('siteId', 'in', siteIds)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
