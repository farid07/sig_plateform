import React, {useRef, useState} from 'react';
import {mutate} from 'swr';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react';

import {deleteOperator} from '@/lib/db';
import {useAuth} from '@/lib/auth';
import {IoTrash} from "react-icons/io5";

const DeleteOperatorButton = ({operatorId}) => {
    const [isOpen, setIsOpen] = useState();
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = async () => {
        deleteOperator(operatorId);
        mutate(
            ['/api/operators', auth.authUser.token],
            async (data) => {
                return {
                    operators: data?.operators.filter((operator) => operator.id !== operatorId)
                };
            },
            false
        );
        onClose();
    };

    return (
        <>
            <Button
                flex={1}
                as={"a"}
                fontSize={'sm'}
                leftIcon={<IoTrash size={"18px"}/>}
                w={"lg"}
                rounded={'lg'}
                cursor={"pointer"}
                colorScheme={'red'}
                onClick={() => setIsOpen(true)}
                boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 38%), 0 10px 10px -5px rgb(66 153 225 / 33%)'
                }
            >
                Supprimer
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer operateur
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Êtes vous sur? Cette action supprimera aussi le compte opérateur créé par l'operateur.
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

export default DeleteOperatorButton;
