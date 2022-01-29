import {useForm} from 'react-hook-form';
import {
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
    ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger,
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
import {createNewEquipment} from "@/lib/db";
import {InfoOutlineIcon} from "@chakra-ui/icons";

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

const AddEquipmentModal = ({children, mutate}) => {
    const initialRef = useRef(null);
    const router = useRouter();
    const toast = useToast();
    const auth = useAuth();
    const [equipmentType, setEquipmentType] = useState("optique")
    const [equipment, setEquipment] = useState("")
    const {handleSubmit, register, formState: {errors, isValid, isDirty}} = useForm({mode: "onChange"});
    const {isOpen, onOpen, onClose} = useDisclosure();

    const options = ["non-optique", "optique"]

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "equipmentType",
        required: true,
        defaultValue: "optique",
        onChange: setEquipmentType
    })

    const group = getRootProps()

    const handleChange = (event) => {
        setEquipment(event.target.value);
    };

    const onCreateEquipment = async ({
                                         name, mark, longitude, latitude, ports, portsOccupees,
                                         longitudeArrivee, latitudeArrivee, typeCable, taille
                                     }) => {
        const newEquipment = {
            createdBy: auth.authUser.uid,
            createdAt: new Date().toISOString(),
            infrastructureType: equipment,
            name,
            mark: mark ? mark : "",
            type: equipmentType,
            longitude: longitude ? longitude : "",
            latitude: latitude ? latitude : "",
            ports: ports ? ports : 0,
            portsOccupees: portsOccupees ? portsOccupees : 0,
            longitudeArrivee: longitudeArrivee ? longitudeArrivee : "",
            latitudeArrivee: latitudeArrivee ? latitudeArrivee : "",
            typeCable: typeCable ? typeCable : "",
            taille: taille ? taille : "",
        };
        console.log(newEquipment)
        createNewEquipment(newEquipment);
        mutate()
        onClose()
        toast({
            title: 'Succès!',
            description: "L'équipement a été bien ajouté.",
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
                <ModalContent as="form" onSubmit={handleSubmit(onCreateEquipment)}>
                    <ModalHeader fontWeight="bold">Ajouter Equipement</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>{"Selectionnez l'infrastructure"}</FormLabel>
                            <Select
                                id={"infrastructureType"}
                                onChange={handleChange}
                                name={"infrastructureType"}
                                mb={4}
                                placeholder="Selectionnez l'infrastructure"
                            >
                                <option key={"nro"} value='nro'>NRO</option>
                                <option key={"bpeo"} value='bpeo'>BPEO</option>
                                <option key={"sro"} value='sro'>SRO</option>
                                <option key={"pbo"} value='pbo'>PBO</option>
                                <option key={"pto"} value='pto'>PTO</option>
                                <option key={"cable"} value='cable'>CABLE</option>
                                <option key={"conduit"} value='conduit'>CONDUIT SOUTERRAIN</option>
                                <option key={"poteau"} value='poteau'>POTEAU</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                ref={initialRef}
                                id="name"
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
                        {['poteau', 'conduit', 'cable'].includes(equipment) || (
                            <FormControl isRequired mt={4}>
                                <FormLabel>Marque</FormLabel>
                                <Input
                                    ref={initialRef}
                                    id="mark"
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
                            </FormControl>)
                        }
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
                        {['nro', 'bpeo', 'sro', 'pbo', 'pto',  'poteau', 'conduit', 'cable'].includes(equipment) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Longitude</FormLabel>
                                    <Input
                                        id="longitude"
                                        ref={initialRef}
                                        placeholder="6.445244"
                                        name="longitude"
                                        autoComplete={"false"}
                                        type={"number"}
                                        min={"-180"}
                                        max={"180"}
                                        step="any"
                                        {...register("longitude", {
                                            required: 'Required',
                                            validate: false
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.longitude && errors?.longitude.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Latitude</FormLabel>
                                    <Input
                                        id="latitude"
                                        ref={initialRef}
                                        placeholder="-6.445244"
                                        name="latitude"
                                        autoComplete={"false"}
                                        type={"number"}
                                        min={"-90"}
                                        max={"90"}
                                        step="any"
                                        {...register("latitude", {
                                            required: 'Required',
                                            validate: false
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.latitude && errors?.latitude.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </>
                        )}
                        {['sro', 'pbo', 'pto'].includes(equipment) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Total ports</FormLabel>
                                    <Input
                                        id="ports"
                                        ref={initialRef}
                                        placeholder="55"
                                        name="ports"
                                        autoComplete={"false"}
                                        type={"number"}
                                        {...register("ports", {
                                            required: 'Required',
                                            validate: true
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.ports && errors?.ports.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </>
                        )}
                        {['pbo'].includes(equipment) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Ports occupés</FormLabel>
                                    <Input
                                        id="portsOccupes"
                                        ref={initialRef}
                                        placeholder="50"
                                        name="portsOccupes"
                                        autoComplete={"false"}
                                        type={"number"}
                                        {...register("portsOccupes", {
                                            required: 'Required',
                                            validate: true
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.portsOccupes && errors?.portsOccupes.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </>
                        )}
                        {['cable'].includes(equipment) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Longitude arrivée</FormLabel>
                                    <Input
                                        id="longitudeArrivee"
                                        ref={initialRef}
                                        placeholder="6.445244"
                                        name="longitudeArrivee"
                                        autoComplete={"false"}
                                        type={"number"}
                                        max={'180'}
                                        min={'-180'}
                                        step={'any'}
                                        {...register("longitudeArrivee", {
                                            required: 'Required',
                                            validate: false
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.longitudeArrivee && errors?.longitudeArrivee.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Latitude arrivée</FormLabel>
                                    <Input
                                        id="latitudeArrivee"
                                        ref={initialRef}
                                        placeholder="-6.445244"
                                        name="latitudeArrivee"
                                        autoComplete={"false"}
                                        type={"number"}
                                        min={'-90'}
                                        max={'90'}
                                        step={'any'}
                                        {...register("latitudeArrivee", {
                                            required: 'Required',
                                            validate: false
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.latitudeArrivee && errors?.latitudeArrivee.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>{"Type de cable"}</FormLabel>
                                    <Select
                                        id={"typeCable"}
                                        onChange={handleChange}
                                        name={"typeCable"}
                                        mb={4}
                                        type={"text"}
                                        {...register("typeCable", {
                                            required: 'Required',
                                            validate: true
                                        })}
                                    >
                                        <option key={"transport"} value='transport'>Transport</option>
                                        <option key={"distribution"} value='distribution'>Distribution</option>
                                        <option key={"branchement"} value='branchement'>Branchement</option>
                                    </Select>
                                    <FormErrorMessage>
                                        {errors?.typeCable && errors?.typeCable.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </>
                        )}
                        {['bpeo'].includes(equipment) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Taille</FormLabel>
                                    <Input
                                        id="taille"
                                        ref={initialRef}
                                        placeholder="T1"
                                        name="taille"
                                        autoComplete={"false"}
                                        type={"text"}
                                        {...register("taille", {
                                            required: 'Required',
                                            validate: true
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.taille && errors?.taille.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </>
                        )}
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

export default AddEquipmentModal;
