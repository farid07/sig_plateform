import {compareAsc, compareDesc, parseISO} from 'date-fns';
import {db} from "./firebase";

export async function getAllFeedback(siteId, route) {
    try {
        let ref = await db
            .collection('feedback')
            .where('siteId', '==', siteId)
            .where('status', '==', 'active');

        if (route) {
            ref = ref.where('route', '==', route);
        }

        const snapshot = await ref.get();
        const feedback = [];

        snapshot.forEach((doc) => {
            feedback.push({id: doc.id, ...doc.data()});
        });

        feedback.sort((a, b) =>
            compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
        );

        return {feedback};
    } catch (error) {
        return {error};
    }
}

export async function getSite(siteId) {
    const doc = await db.collection('sites').doc(siteId).get();
    const site = {id: doc.id, ...doc.data()};

    return {site};
}

export async function getOperator(operatorId) {
    const doc = await db.collection('operators').doc(operatorId).get();
    console.log({id: doc.id, ...doc.data()})
    const operator = {id: doc.id, ...doc.data()};

    return {operator};
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
    const {sites} = await getUserSites(uid);

    if (!sites.length) {
        return {feedback: []};
    }

    const siteIds = sites.map((site) => site.id);
    const snapshot = await db
        .collection('feedback')
        .where('siteId', 'in', siteIds)
        .get();

    const feedback = [];

    snapshot.forEach((doc) => {
        feedback.push({id: doc.id, ...doc.data()});
    });

    return {feedback};
}
