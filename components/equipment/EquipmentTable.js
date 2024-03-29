import React from 'react';
import NextLink from 'next/link';
import {Box, Link, Text} from '@chakra-ui/react';
import {format, parseISO} from 'date-fns';

import {Table, Td, Th, Tr} from './../Table';
import DeleteEquipmentButton from "@/components/equipment/DeleteEquipmentButton";
import UpdateEquipmentModal from "@/components/equipment/UpdateEquipmentModal";

const EquipmentTable = ({equipments, operator, mutate}) => {
    console.log('vvvvv', equipments)
    return (
        <Box overflowX="scroll" mr={'8px'}>
            <Table w="full">
                <thead>
                <Tr>
                    <Th> Nom </Th>
                    <Th> Longitude </Th>
                    <Th> Latitude </Th>
                    <Th> Type </Th>
                    <Th>Ajouté le</Th>
                    <Th width="50px">{''}</Th>
                </Tr>
                </thead>
                <tbody>
                {equipments.map((equipment, index) => (
                    <Box as="tr" key={equipment.id}>
                        <Td>
                            <NextLink
                                href="/equipments/[id]"
                                as={`/equipments/${equipment.id}`}
                                passHref
                            >
                                {equipment.name}
                            </NextLink>
                        </Td>
                        <Td>
                            <NextLink
                                href="/equipments/[id]"
                                as={`/equipments/${equipment.id}`}
                                passHref
                            >
                                {equipment.longitude}
                            </NextLink>
                        </Td>
                        <Td>
                            <NextLink
                                href="/equipments/[id]"
                                as={`/equipments/${equipment.id}`}
                                passHref
                            >
                                {equipment.latitude}
                            </NextLink>
                        </Td>
                        <Td>
                            <Text id={`equipment-table-link-${index}`} fontWeight="medium">
                                {equipment.type}
                            </Text>
                        </Td>
                        <Td>{format(parseISO(equipment?.createdAt), 'PPpp')}</Td>
                        <Td display={"flex"}>
                            <UpdateEquipmentModal operator={operator} equipment={equipment} mutate={mutate}/>
                            <DeleteEquipmentButton equipmentId={equipment.id}/>
                        </Td>
                    </Box>
                ))}
                </tbody>
            </Table>
        </Box>
    );
};

export default EquipmentTable;
