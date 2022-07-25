import React, {useRef, useState} from 'react';
import {mutate} from 'swr';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    IconButton
} from '@chakra-ui/react';

import {deleteUser} from '@/lib/db';
import {useAuth} from '@/lib/auth';
import {IoTrash} from "react-icons/io5";

const DeleteUserButton = ({userId}) => {
    const [isOpen, setIsOpen] = useState();
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = () => {
        deleteUser(userId);
        mutate(
            ['/api/users', auth.authUser.token],
            async (data) => {
                return {
                    users: data.users.filter((user) => user.id !== userId)
                };
            },
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton
                aria-label="Delete user"
                icon={<IoTrash/>}
                color={"red.500"}
                variant="ghost"
                onClick={() => setIsOpen(true)}
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer utilisateur
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Êtes vous sur? Cette action supprimera aussi le compte opérateur créé par l'utilisateur.
                        Vous ne pourrez plus faire de retour arrière.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button
                            fontWeight="bold"
                            variant="solid"
                            colorScheme={"red"}
                            onClick={onDelete}
                            ml={3}
                        >
                            Oui, supprimer
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteUserButton;
