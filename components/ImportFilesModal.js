import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import {AiFillFileAdd} from 'react-icons/ai';
import create from 'zustand';
import {convertToBase64} from '@/utils/parser';
import DropZone from '@/components/DropZone';

const useStore = create((set) => ({
    valid: true,
    parseAndValidate: async (file) => {
        try {
            const data = await convertToBase64(file);

            set({valid: true});

            return data;
        } catch (_) {
            set({valid: false});

            return false;
        }
    },
    reset: () => {
        set({valid: true});
    },
}));

export default function ImportFilesModal({replaceFileState, title}) {
    const valid = useStore((state) => state.valid);
    const parseAndValidate = useStore((state) => state.parseAndValidate);
    const reset = useStore((state) => state.reset);

    const {isOpen, onOpen, onClose} = useDisclosure({
        onOpen: () => reset(),
    });

    const importFile = async (file) => {
        const base64 = await parseAndValidate(file);

        if (base64) {
            replaceFileState({file: base64});
            onClose();
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

    return (
        <>
            <Button required={true} leftIcon={<AiFillFileAdd/>} colorScheme="teal" variant="outline" onClick={onOpen}>
                {title}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <DropZone onFileAccepted={importFile}/>
                        {invalidAlert}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={onClose}>
                            Annuler
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}