import {useForm} from 'react-hook-form';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useRadio,
    useRadioGroup,
    useToast
} from '@chakra-ui/react';

import {MdAdd} from "react-icons/md";
import {useAuth} from '@/lib/auth';
import {useRef, useState} from "react";

function RadioCard(props) {
    const {getInputProps, getCheckboxProps} = useRadio(props)
    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                _checked={{
                    bg: "gray.900",
                    color: "white",
                    borderColor: "white",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}

const AddUserModal = ({children, mutate}) => {
    const initialRef = useRef(null);
    const toast = useToast();
    const auth = useAuth();
    const [accountType, setAccountType] = useState("operateur")
    const {handleSubmit, register, formState: {errors, isValid, isDirty}} = useForm({mode: "onChange"});
    const {isOpen, onOpen, onClose} = useDisclosure();

    const options = ["admin", "operateur"]

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "account_type",
        required: true,
        defaultValue: "operateur",
        onChange: setAccountType
    })

    const group = getRootProps()

    const onCreateUser = async ({first_name, last_name, email, password}) => {
        const newUser = {
            createdBy: auth.authUser.uid,
            createdAt: new Date().toISOString(),
            first_name,
            last_name,
            password,
            email,
            account_type: accountType
        };
        auth.createUserWithEmailAndPassword(newUser);
        mutate();
        onClose();
        toast({
            title: 'Succès!',
            description: "Le compte utilisateur a été bien ajouté.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });
    };

    return (
        <>
            <Button
                id="add-user-modal-button"
                onClick={onOpen}
                backgroundColor="teal.500"
                color="white"
                leftIcon={<MdAdd/>}
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
                <ModalContent as="form" onSubmit={handleSubmit(onCreateUser)}>
                    <ModalHeader fontWeight="bold">Ajouter Utilisateur</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                ref={initialRef}
                                id="first_name"
                                placeholder="Nom"
                                name="first_name"
                                type={"text"}
                                {...register("first_name", {
                                    required: 'Required',
                                    validate: true
                                })}
                            />
                            <FormErrorMessage>
                                {errors?.first_name && errors?.first_name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Prénoms</FormLabel>
                            <Input
                                ref={initialRef}
                                id="last_name"
                                placeholder="Prénoms"
                                name="last_name"
                                type={"text"}
                                {...register("last_name", {
                                    required: 'Required',
                                    validate: true
                                })}
                            />
                            <FormErrorMessage>
                                {errors?.last_name && errors?.last_name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                id="email"
                                ref={initialRef}
                                placeholder="jonh.doe@site.com"
                                name="email"
                                autoComplete={"false"}
                                type={"email"}
                                {...register("email", {
                                    required: 'Required',
                                    validate: true
                                })}
                            />
                            <FormErrorMessage>
                                {errors?.email && errors?.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                id="password"
                                ref={initialRef}
                                placeholder="Mot de passe"
                                autoComplete={"false"}
                                name="password"
                                type={"password"}
                                {...register("password", {
                                    required: 'Required',
                                    minLength: {
                                        value: 8,
                                        message: "Le mot de passe doit être de 8 caractères minimum !"
                                    }
                                })}
                            />
                            <FormErrorMessage>
                                {errors?.password && errors?.password.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel>Type de compte</FormLabel>
                            <HStack
                                {...group}
                            >
                                {options.map((value) => {
                                    const radio = getRadioProps({value})
                                    return (
                                        <RadioCard key={value} {...radio} >
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </RadioCard>
                                    )
                                })}
                            </HStack>
                            <FormErrorMessage>
                                {errors?.account_type && errors?.account_type.message}
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Annuler
                        </Button>
                        <Button
                            id="create-site-button"
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Ajouter
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddUserModal;
