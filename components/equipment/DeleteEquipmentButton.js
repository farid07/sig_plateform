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
import {useAuth} from '@/lib/auth';
import {IoTrash} from "react-icons/io5";
import {deleteEquipment} from "@/lib/db";

const DeleteEquipmentButton = ({equipmentId}) => {
    const [isOpen, setIsOpen] = useState();
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = () => {
        deleteEquipment(equipmentId);
        mutate(
            ['/api/equipments', auth.authUser.token],
            async (data) => {
                return {
                    equipments: data?.equipments?.filter((equipment) => equipment.id !== equipmentId)
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
                        Supprimer equipement
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {"Êtes vous sur? Cette action supprimera l'équipement. Vous ne pourrez plus faire de retour arrière."}
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

export default DeleteEquipmentButton;
