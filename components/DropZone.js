import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Center, FormControl, FormLabel, Icon, Input, useColorModeValue} from '@chakra-ui/react';
import {AiFillFileAdd} from 'react-icons/ai';

export default function DropZone({onFileAccepted, helpText}) {
    const onDrop = useCallback((acceptedFiles) => {
        onFileAccepted(acceptedFiles[0]);
    }, [onFileAccepted]);

    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
        onDrop, accept: 'image/jpeg, image/png', maxFiles: 1, multiple: false,
    });

    const dropText = isDragActive ? 'Deposez votre logo ici ...' : 'Glissez et déposez le logo ici, ou cliquez pour sélectionnez';

    const activeBg = useColorModeValue('gray.100', 'gray.600');
    const borderColor = useColorModeValue(
        isDragActive || isDragAccept ? 'teal.300' : 'gray.300',
        isDragActive || isDragAccept ? 'teal.500' : 'gray.500',
    );

    return (
        <FormControl
            mt={4}
            isRequired
        >
            <FormLabel>Logo</FormLabel>
            <Center
                p={10}
                cursor="pointer"
                bg={isDragActive ? activeBg : 'transparent'}
                _hover={{bg: activeBg}}
                transition="background-color 0.2s ease"
                borderRadius={4}
                border="3px dashed"
                borderColor={borderColor}
                {...getRootProps()}
            >
                <Input
                    id="logo-input"
                    name="logo"
                    style={{display: "block"}}
                    hidden={true}
                    type={"file"}
                    {...getInputProps()}
                    isInvalid={isDragReject}
                />
                <Icon as={AiFillFileAdd} mr={2}/>
                <p>{dropText}</p>
            </Center>
        </FormControl>
    );
}