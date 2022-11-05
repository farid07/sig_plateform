import {useForm} from 'react-hook-form';
import {
    Alert, AlertDescription, AlertIcon, AlertTitle,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack, IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
    useRadio,
    useRadioGroup,
    useToast
} from '@chakra-ui/react';
import {MdAdd} from "react-icons/md";
import {useAuth} from '@/lib/auth';
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {updateEquipment} from "@/lib/db";
import {convertToBase64} from "@/utils/parser"; // ===
import create from "zustand"; // ===
import AddImages from "@/components/AddImages";

const initialState = {files: ''}; // ===


// ===
const useStore = create((set) => ({
    valid: true,
    parseAndValidate: async (acceptedFiles) => {
        try {
            let data = []
            acceptedFiles.map(async (file, index) => {
                const convertedFile = await convertToBase64(file);
                data.push(convertedFile)
            })

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

// ===

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

const AddImageModal = ({children, operator, mutate}) => {
    const [replaceFiles, setReplaceFiles] = useState(initialState); // ===//Créer un équipement
//     async function createNewEquipment(data) {
//     const equipment = await firestore.collection('equipments').doc();
//     equipment.set(data, {merge: true});
//     return equipment;
// }
    const initialRef = useRef(null);
    const router = useRouter();
    const equipmentId = router.query.id
    const toast = useToast();
    const auth = useAuth();
    const {handleSubmit, register, formState: {errors, isValid, isDirty}} = useForm({mode: "onChange"});
    const {isOpen, onOpen, onClose} = useDisclosure();

    // ===
    const valid = useStore((state) => state.valid);
    const parseAndValidate = useStore((state) => state.parseAndValidate);
    const reset = useStore((state) => state.reset);

    const importFiles = async (files) => {
        const files_base64 = await parseAndValidate(files);

        if (files_base64) {
            setReplaceFiles({files: files_base64});
        }
    };

    let invalidAlert = null;

    if (!valid) {
        invalidAlert = (
            <Alert status="error" borderRadius={4} mt={5}>
                <AlertIcon/>
                <AlertTitle mr={2}>Fichier invalide </AlertTitle>
                <AlertDescription>Choisissez un autre fichier</AlertDescription>
            </Alert>
        );
    }

    // ===

    // ??????????????????????????????????????????????????????????????????????????????????????,
    const onAddImage = async ({name, taille}) => {
        console.log(replaceFiles)
        const newImages = {
            createdBy: auth.authUser.uid,
            createdAt: new Date().toISOString(),
            userId: auth.authUser?.uid,
            photos: replaceFiles.files,
        };

        await updateEquipment(equipmentId, newImages);
        mutate()
        onClose()
        toast({
            title: 'Succès!',
            description: "Les photos ont été bien ajoutée.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });
    };

    return (
        <>
            <Button
                id="add-equipment-modal-button"
                onClick={onOpen}
                backgroundColor="blue.300"
                color="black"
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
                <ModalContent as="form" onSubmit={handleSubmit(onAddImage)} bg={"blue.200"}>
                    <ModalHeader fontWeight="bold">Ajouter des images </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>

                        <AddImages onFileAccepted={importFiles}/>
                        {invalidAlert}

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
}
export default AddImageModal;
