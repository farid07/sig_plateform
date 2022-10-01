import {useForm} from 'react-hook-form';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import {createOperator, updateOperator} from '@/lib/db';
import {useAuth} from '@/lib/auth';
import create from "zustand";
import React, {useRef, useState} from "react";
import DropZone from "@/components/DropZone";
import {convertToBase64} from "@/utils/parser";
import {InfoOutlineIcon} from "@chakra-ui/icons";
import {AiFillEdit} from "react-icons/ai";

const initialState = {
    file: ''
};

const useStore = create((set) => ({
    valid: true,
    parseAndValidate: async (file) => {
        try {
            const data = await convertToBase64(file);

            set({valid: true});

            return data;
        } catch (e) {
            set({valid: false});

            return false;
        }
    },
    reset: () => {
        set({valid: true});
    },
}));
const UpdateOperatorModal = ({operator, children, mutate}) => {
    const [replaceFile, setReplaceFile] = useState(initialState);
    const [operatorColor, setOperatorColor] = useState("#07A3BE");
    const initialRef = useRef(null);
    const colorPicker = useRef(null);
    const toast = useToast();
    const auth = useAuth();
    const {handleSubmit, register} = useForm();

    const valid = useStore((state) => state.valid);
    const parseAndValidate = useStore((state) => state.parseAndValidate);
    const reset = useStore((state) => state.reset);

    const {isOpen, onOpen, onClose} = useDisclosure({
        onOpen: () => reset(),
    });

    const importFile = async (file) => {
        const base64 = await parseAndValidate(file);

        if (base64) {
            setReplaceFile({file: base64});
        }
    };

    let invalidAlert = null;

    if (!valid) {
        invalidAlert = (
            <Alert status="error" borderRadius={4} mt={5}>
                <AlertIcon/>
                <AlertTitle mr={2}>Fichier invalid</AlertTitle>
                <AlertDescription>Choisissez un autre fichier</AlertDescription>
            </Alert>
        );
    }


    const onUpdateOperator = ({name, url, email}) => {
        const newOperator = {
            userId: auth.authUser.uid,
            createdAt: new Date().toISOString(),
            name,
            url,
            email,
            logo: replaceFile.file,
            settings: {
                color: operatorColor,
            }
        };

        const {id} = updateOperator(newOperator);
        toast({
            title: 'Succès!',
            description: "Nous avons mis à jour le compte opérateur.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });
        mutate('/api/operators/');
        onClose();
    };

    return (
        <>
            <Button
                id="update-operator-modal-button"
                onClick={onOpen}
                backgroundColor="teal.500"
                color="white"
                leftIcon={<AiFillEdit/>}
                fontWeight="medium"
                _hover={{bg: 'gray.700'}}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                {children}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} mt={12} initialFocusRef={initialRef}>
                <ModalOverlay/>
                <ModalContent as="form" onSubmit={handleSubmit(onUpdateOperator)} bg={'blue.200'}>
                    <ModalHeader fontWeight="bold" fontFamily={"Georgia"}>Editer un compte Opérateur</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                ref={initialRef}
                                id="name-input"
                                placeholder="Nom operateur"
                                defaultValue={operator?.name}
                                name="name"
                                {...register("name", {
                                    required: 'Required'
                                })}
                            />
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel> Email </FormLabel>
                            <Input
                                id="email-input"
                                ref={initialRef}
                                placeholder="contact@siteweb.com"
                                name="email"
                                defaultValue={operator?.email}
                                {...register("email", {
                                    required: 'Required'
                                })}
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel>Site Web</FormLabel>
                            <Input
                                id="link-input"
                                ref={initialRef}
                                placeholder="https://siteweb.com"
                                name="url"
                                defaultValue={operator?.url}
                                {...register("url", {
                                    required: 'Required'
                                })}
                            />
                        </FormControl>
                        <DropZone onFileAccepted={importFile}/>
                        {invalidAlert}
                        <FormControl isRequired>
                            <FormLabel
                                mt={4}
                            >
                                Couleur
                                <Popover>
                                    <PopoverTrigger>
                                        <IconButton size="sm" ml={3} variant={"outline"} icon={<InfoOutlineIcon/>}
                                                    aria-label={"info"}/>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow/>
                                        <PopoverCloseButton/>
                                        {/*<PopoverHeader>Couleur principale de l'opérateur</PopoverHeader>*/}
                                        <PopoverBody>Cette couleur sera utilisée pour représenter vos équipements sur la
                                            carte</PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </FormLabel>
                            <Input
                                ref={colorPicker}
                                onChange={() =>
                                    setOperatorColor(colorPicker.current.value)
                                }
                                defaultValue='#07A3B'
                                type='color'
                                id='colorPicker'
                                name='colorPicker'

                                w={16}
                                h={12}
                                p={0}
                                m={0}
                                cursor='pointer'
                                borderWidth='0px'
                                borderRadius='lg'
                                borderColor="transparent"
                                bg='transparent'
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Annuler
                        </Button>
                        {/*<Button*/}
                        {/*    id="create-site-button"*/}
                        {/*    backgroundColor="#99FFFE"*/}
                        {/*    color="#194D4C"*/}
                        {/*    fontWeight="medium"*/}
                        {/*    type="submit"*/}
                        {/*>*/}
                        {/*    Ajouter*/}
                        {/*</Button>*/}
                        <Button
                            id="update-operator-button"
                            backgroundColor="white"
                            color="black"
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

export default UpdateOperatorModal;
