export const getFirebaseErrors = (error) => {
    const unknown_error = {
        title: {
            TEST: error.code,
            EN: "Oops... An error occurred!",
            FR: "Oops... Une erreur inattendue est survenue!"
        },
        message: {
            TEST: error.message,
            EN: `Contact technical support.`,
            FR: `Veuillez contacter le support technique.`
        },
    }
    const errors = {
        'auth/user-not-found': {
            title: {
                EN: "Oops... An error occurred!",
                FR: "Oops... Une erreur est survenue!"
            },
            message: {
                EN: `There is no account record corresponding to this email. The account may have been deleted.`,
                FR: `Aucun compte ne correspond à cet email. Le compte a peut-être été supprimé ou désactivé.`
            },
        },
        'auth/network-request-failed': {
            title: {
                EN: "Oops... An error occurred!",
                FR: "Oops... Une erreur est survenue!"
            },
            message: {
                EN: `A network error has occurred. Verify your internet connection and try again`,
                FR: `Il semble que vous avez perdu la connexion internet. Reconnectez vous puis réessayez.`
            },
        },
        'auth/email-already-in-use': {
            title: {
                EN: "Oops... An error occurred!",
                FR: "Oops... Une erreur est survenue!"
            },
            message: {
                EN: `The email address is already in use by another account.`,
                FR: `L'adresse e-mail fourni est déjà utilisé par un autre compte.`
            },
        },
        'auth/wrong-password': {
            title: {
                EN: "Oops... An error occurred!",
                FR: "Oops... Une erreur est survenue!"
            },
            message: {
                EN: `The password is invalid.`,
                FR: `Le mot de passe est incorrect. Réessayez s'il vous plait`
            },
        },
        'auth/too-many-requests': {
            title: {
                EN: "Oops... An error occurred!",
                FR: "Oops... Une erreur est survenue!"
            },
            message: {
                EN: `Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.`,
                FR: `L'accès à ce compte a été temporairement désactivé en raison de plusieurs essais connexion. Vous pouvez le restaurer immédiatement en réinitialisant votre mot de passe ou essayer de vous connecter plutard.`
            },
        },
        'auth/email-already-exists': {
            title: {
                EN: "Oops... An error occurred!",
                FR: "Oops... Une erreur est survenue!"
            },
            message: {
                EN: `The provided email is already in use by an existing user.`,
                FR: `L'e-mail fourni exist déjà. Veuillez utiliser un autre e-mail! `
            },
        },

    }

    if (error) {
        const not_known_error = !(error.code in errors)
        if (not_known_error){
            return unknown_error
        }
        return errors[error.code];
    }
}
