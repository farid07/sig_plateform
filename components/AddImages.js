// import React, {useCallback, useState} from 'react';
// import {useDropzone} from 'react-dropzone';
// import {Box, Center, FormControl, FormLabel, Icon, Input, Skeleton, useColorModeValue} from '@chakra-ui/react';
// import {AiFillFileAdd} from 'react-icons/ai';
//
// import {addDoc, collection, updateDoc} from 'firebase/firestore';
// import { ref, getDownloadURL, uploadBytes} from '@firebase/storage' ;
//
//
// export default function AddImages({helpText}) {
//     const [selectedImages, setSelectedImages]=useState([]);
//     const uploadImages= async()=>{
//         await Promise.all(
//             selectedImages.map(image=>{
//                 uploadBytes(imageRef, image,"data_url").then(async()=>{
//                     const downloadURL = await getDownloadURL(imageRef)
//                     await updateDoc(doc(db, ))
//                 })
//             })
//         )
//     }
//
//     const onAdd = useCallback((acceptedFiles) => {
//         setSelectedImages(acceptedFiles.map(file =>{
//             Object.assign(file,{
//                 preview:URL.createObjectURL(file)
//             })
//         }));
//     }, []);
//
//     const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
//         onAdd, accept: 'image/jpeg, image/png, image/svg', maxFiles: 15, multiple: true,
//     });
//
//     const selected_images = selectedImages?.map(file =>(
//         <div>
//             <img src={file.preview} style={{width:"200px"}} alt={""}/>
//         </div>
//         )
//     )
//
//     const dropText = isDragActive ? 'Deposez votre photo ici ...' : 'Glissez et déposez la photo ici, ou cliquez pour sélectionner';
//
//     const activeBg = useColorModeValue('gray.100', 'gray.600');
//     const borderColor = useColorModeValue(
//         isDragActive || isDragAccept ? 'teal.300' : 'gray.300',
//         isDragActive || isDragAccept ? 'teal.500' : 'gray.500',
//     );
//
//     return (
//         <FormControl
//             mt={4}
//             isRequired
//         >
//             <FormLabel>Photo</FormLabel>
//             <Center
//                 p={10}
//                 cursor="pointer"
//                 bg={isDragActive ? activeBg : 'transparent'}
//                 _hover={{bg: activeBg}}
//                 transition="background-color 0.2s ease"
//                 borderRadius={4}
//                 border="3px dashed"
//                 borderColor={borderColor}
//                 {...getRootProps()}
//             >
//                 <Input
//                     id="photo-input"
//                     name="photo"
//                     style={{display: "block"}}
//                     hidden={true}
//                     type={"file"}
//                     {...getInputProps()}
//                     isInvalid={isDragReject}
//                 />
//                 <Icon as={AiFillFileAdd} mr={2}/>
//                 <p>{dropText}</p>
//                 {selected_images}
//             </Center>
//         </FormControl>
//     );
// }


import {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Center, FormControl, FormLabel, Icon, Input, useColorModeValue} from '@chakra-ui/react';
import {AiFillFileAdd} from 'react-icons/ai';

export default function DropZone({onFileAccepted, helpText}) {
    const onDrop = useCallback((acceptedFiles) => {
        onFileAccepted(acceptedFiles);
    }, [onFileAccepted]);

    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
        onDrop, accept: 'image/jpeg, image/png, image/svg', maxFiles: 10, multiple: true,
    });

    const dropText = isDragActive ? 'Deposez votre logo ici ...' : 'Glissez et déposez le logo ici, ou cliquez pour sélectionner';

    const activeBg = useColorModeValue('gray.100', 'gray.600');
    const borderColor = useColorModeValue(
        isDragActive || isDragAccept ? 'teal.300' : 'gray.300',
        isDragActive || isDragAccept ? 'teal.500' : 'gray.500',
    );

    return (
        <FormControl mt={4} isRequired>
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









