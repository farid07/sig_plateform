import admin from "firebase-admin";

export function grantAdminRole(email) {
    const user = admin.auth()
        .getUserByEmail(email); // 1
    if (user.customClaims && user.customClaims.admin === true) {
        return;
    } // 2
    return admin.auth()
        .setCustomUserClaims(user.uid, {
            admin: true
        }); // 3
}

export function grantOperatorRole(email) {
    const user = admin.auth()
        .getUserByEmail(email); // 1
    if (user.customClaims && user.customClaims.operator === true) {
        return;
    } // 2
    return admin.auth()
        .setCustomUserClaims(user.uid, {
            operator: true
        }); // 3
}