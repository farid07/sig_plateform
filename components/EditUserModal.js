import {useForm} from 'react-hook-form';
import {mutate} from 'swr';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import {MdEdit} from "react-icons/md";

const EditUserModal = ({userId, children}) => {
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {handleSubmit, register} = useForm();

    const onUpdateUser = async (newSettings) => {
        await updateUser(userId);
        toast({
            title: 'Succès!',
            description: "L'utilisateur a été bien mis à jour.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });

        mutate(`/api/user/${userId}`);
        onClose();
    };

    return (
        <>
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<MdEdit/>}
                _hover={{bg: 'gray.700'}}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                {children}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent as="form" onSubmit={handleSubmit(onUpdateUser)}>
                    <ModalHeader fontWeight="bold">Modifier Utilisateur</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        {/*<FormControl>*/}
                        {/*  <Switch*/}
                        {/*    key={settings?.timestamp}*/}
                        {/*    name="timestamp"*/}
                        {/*    ref={register()}*/}
                        {/*    color="green"*/}
                        {/*    defaultIsChecked={settings?.timestamp}*/}
                        {/*  />*/}
                        {/*  <FormLabel ml={2} htmlFor="show-timestamp">*/}
                        {/*    Show Timestamp*/}
                        {/*  </FormLabel>*/}
                        {/*</FormControl>*/}
                        {/*<FormControl>*/}
                        {/*  <Switch*/}
                        {/*    key={settings?.icons}*/}
                        {/*    name="icons"*/}
                        {/*    ref={register()}*/}
                        {/*    color="green"*/}
                        {/*    defaultIsChecked={settings?.icons}*/}
                        {/*  />*/}
                        {/*  <FormLabel ml={2} htmlFor="show-icons">*/}
                        {/*    Show Icon*/}
                        {/*  </FormLabel>*/}
                        {/*</FormControl>*/}
                        {/*<FormControl>*/}
                        {/*  <Switch*/}
                        {/*    key={settings?.ratings}*/}
                        {/*    name="ratings"*/}
                        {/*    ref={register()}*/}
                        {/*    color="green"*/}
                        {/*    defaultIsChecked={settings?.ratings}*/}
                        {/*  />*/}
                        {/*  <FormLabel ml={2} htmlFor="show-ratings">*/}
                        {/*    Show Ratings*/}
                        {/*  </FormLabel>*/}
                        {/*</FormControl>*/}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Annuler
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Modifier
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditUserModal;
