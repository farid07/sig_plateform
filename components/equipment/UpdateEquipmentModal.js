import {useForm} from 'react-hook-form';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    IconButton,
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
import {useAuth} from '@/lib/auth';
import React, {useRef, useState} from "react";
import {AiFillEdit} from "react-icons/ai";

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

const UpdateEquipmentModal = ({equipment, mutate}) => {
    const initialRef = useRef(null);
    const toast = useToast();
    const auth = useAuth();
    const [equipmentType, setEquipmentType] = useState(equipment?.type)
    const {handleSubmit, register, formState: {errors, isValid, isDirty}} = useForm({mode: "onChange"});
    const {isOpen, onOpen, onClose} = useDisclosure();

    const options = ["non-optique", "optique"]

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "equipmentType",
        required: true,
        defaultValue: equipment?.type,
        onChange: setEquipmentType
    })

    const group = getRootProps()

    const onUpdateEquipment = async ({name, mark, equipmentType, email, password}) => {
        const newEquipment = {
            createdBy: auth.authUser.uid,
            createdAt: new Date().toISOString(),
            name,
            mark,
            equipmentType,
            password,
            email,
            type: equipmentType
        };
        auth.updateFullUserProfile(newEquipment);
        onClose()
        mutate('/api/equipments')
        toast({
            title: 'Succès!',
            description: "Les informations de l'équipement ont été bien modifiées.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });
    };

    return (
        <>
            <IconButton
                aria-label="Delete equipment"
                icon={<AiFillEdit/>}
                color={"green.500"}
                variant="ghost"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} mt={12} initialFocusRef={initialRef}>
                <ModalOverlay/>
                <ModalContent as="form" onSubmit={handleSubmit(onUpdateEquipment)}>
                    <ModalHeader fontWeight="bold">Modifier Equipement</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                ref={initialRef}
                                id="name"
                                value={equipment?.name}
                                placeholder="Nom"
                                name="name"
                                type={"text"}
                                {...register("name", {
                                    required: 'Required',
                                    validate: true
                                })}
                            />
                            <FormErrorMessage>
                                {errors?.name && errors?.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Marque</FormLabel>
                            <Input
                                ref={initialRef}
                                id="mark"
                                value={equipment?.mark}
                                placeholder="Marque"
                                name="mark"
                                type={"text"}
                                {...register("mark", {
                                    required: 'Required',
                                    validate: true
                                })}
                            />
                            <FormErrorMessage>
                                {errors?.mark && errors?.mark.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                id="email"
                                ref={initialRef}
                                placeholder="jonh.doe@site.com"
                                name="email"
                                value={equipment?.email}
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
                            <FormLabel>Type</FormLabel>
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
                                {errors?.equipmentType && errors?.equipmentType.message}
                            </FormErrorMessage>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Annuler
                        </Button>
                        <Button
                            id="update-equipment-button"
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

export default UpdateEquipmentModal;
