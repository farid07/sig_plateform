import {compareAsc, compareDesc, parseISO} from 'date-fns';
import {db} from "@/lib/firebase";

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

export async function getUserRole(userId) {
    const doc = await db.collection('users').doc(userId).get();
    return {id: doc.id, ...doc.data()};
}


export async function getOperator(operatorId) {
    const doc = await db.collection('operators').doc(operatorId).get();
    return {id: doc.id, ...doc.data()};
}

export async function getNetwork(networkId) {
    const doc = await db.collection('networks').doc(networkId).get();
    const network = {id: doc.id, name: doc.name, ...doc.data()};

    return {network};
}

export async function getEquipment(equipmentId) {
    const doc = await db.collection('equipments').doc(equipmentId).get();
    const equipment = {id: doc.id, ...doc.data()};
    console.log({equipment})

    return {equipment};
}

export async function getOperators() {
    const snapshot = await db.collection('operators').get();

    const operators = [];

    snapshot.forEach((doc) => {
        operators.push({id: doc.id, ...doc.data()});
    });

    return {operators};
}

export async function getNetworks() {
    const snapshot = await db.collection('networks').get();

    const networks = [];

    snapshot.forEach((doc) => {
        networks.push({id: doc.id, ...doc.data()});
    });

    return {networks};
}

export async function getEquipments() {
    const snapshot = await db.collection('equipments').get();

    const equipments = [];

    snapshot.forEach((doc) => {
        equipments.push({id: doc.id, ...doc.data()});
    });

    return {equipments};
}

export async function getUsers() {
    const snapshot = await db.collection('users').get();

    const users = [];

    snapshot.forEach((doc) => {
        users.push({id: doc.id, ...doc.data()});
    });

    return {users};
}

export async function getUser(userId) {
    const doc = await db.collection('users').doc(userId).get();
    return {id: doc.id, ...doc.data()};
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

    return operators;
}

export async function getUserEquipments(uid) {
    const snapshot = await db
        .collection('equipments')
        .where('userId', '==', uid)
        .get();

    const equipments = [];

    snapshot.forEach((doc) => {
        equipments.push({id: doc.id, ...doc.data()});
    });

    equipments.sort((a, b) =>
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return equipments;
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
