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
    Select,
    useDisclosure,
    useRadio,
    useRadioGroup,
    useToast
} from '@chakra-ui/react';
import {useAuth} from '@/lib/auth';
import React, {useRef, useState} from "react";
import {AiFillEdit} from "react-icons/ai";
import {updateEquipment} from "@/lib/db";

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
    const [infrastructure, setInfrastructure] = useState(equipment?.infrastructureType)
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

    const handleChange = (event) => {
        setInfrastructure(event.target.value);
    };
    const onUpdateEquipment = async ({
                                         name, mark, longitude, latitude, ports, portsOccupees,
                                         longitudeArrivee, latitudeArrivee, typeCable, taille
                                     }) => {
        const newEquipment = {
            createdBy: auth.authUser.uid,
            createdAt: new Date().toISOString(),
            infrastructureType: infrastructure,
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

        updateEquipment(equipment?.id, newEquipment);
        mutate()
        onClose()
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
                aria-label="Update user"
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
                            <FormLabel>{"Selectionnez l'infrastructure"}</FormLabel>
                            <Select
                                ref={initialRef}
                                id="infrastructureType"
                                onChange={handleChange}
                                name={"infrastructureType"}
                                mb={4}
                                type={"text"}
                                placeholder="Selectionnez l'infrastructure"
                                defaultValue={infrastructure}
                            >
                                <option key={"nro"} value='nro'>NRO</option>
                                <option key={"bpeo"} value='bpeo'>BPEO</option>
                                <option key={"sro"} value='sro'>SRO</option>
                                <option key={"pbo"} value='pbo'>PBO</option>
                                <option key={"pto"} value='pto'>PTO</option>
                                <option key={"cable"} value='cable'>CABLE</option>
                                <option key={"conduit"} value='conduit'>CONDUIT SOUTERRAIN</option>
                                <option key={"poteau"} value='poteau'  >POTEAU</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                ref={initialRef}
                                id="name"
                                defaultValue={equipment?.name}
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
                        {['poteau', 'conduit', 'cable'].includes(infrastructure) || (
                            <FormControl isRequired mt={4}>
                                <FormLabel>Marque</FormLabel>
                                <Input
                                    ref={initialRef}
                                    id="mark"
                                    defaultValue={equipment?.mark}
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
                        {['nro', 'bpeo', 'sro', 'pbo', 'pto', 'poteau', 'conduit', 'cable'].includes(infrastructure) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Longitude</FormLabel>
                                    <Input
                                        id="longitude"
                                        defaultValue={equipment?.longitude}
                                        ref={initialRef}
                                        placeholder="6.445244"
                                        name="longitude"
                                        autoComplete={"false"}
                                        type={"number"}
                                        min={'-180'}
                                        max={'180'}
                                        step={'any'}
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
                                        defaultValue={equipment?.latitude}
                                        ref={initialRef}
                                        placeholder="-6.445244"
                                        name="latitude"
                                        autoComplete={"false"}
                                        type={"number"}
                                        max={'-90'}
                                        min={'90'}
                                        step={'any'}
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
                        {['sro', 'pbo', 'pto'].includes(infrastructure) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Total ports</FormLabel>
                                    <Input
                                        id="ports"
                                        defaultValue={equipment?.ports}
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
                        {['pbo'].includes(infrastructure) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Ports occupés</FormLabel>
                                    <Input
                                        id="portsOccupes"
                                        defaultValue={equipment?.portsOccupees}
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
                        {['cable'].includes(infrastructure) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Longitude arrivée</FormLabel>
                                    <Input
                                        id="longitudeArrivee"
                                        defaultValue={equipment?.longitudeArrivee}
                                        ref={initialRef}
                                        placeholder="6.445244"
                                        name="longitudeArrivee"
                                        autoComplete={"false"}
                                        type={"decimal"}
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
                                        defaultValue={equipment?.latitudeArrivee}
                                        ref={initialRef}
                                        placeholder="-6.445244"
                                        name="latitudeArrivee"
                                        autoComplete={"false"}
                                        type={"decimal"}
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
                                        defaultValue={equipment?.typeCable}
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
                        {['bpeo'].includes(infrastructure) && (
                            <>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Taille</FormLabel>
                                    <Input
                                        id="taille"
                                        defaultValue={equipment?.taille}
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
                            Modifier
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateEquipmentModal;
