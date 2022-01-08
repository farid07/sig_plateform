import React from 'react';
import NextLink from 'next/link';
import {Box, Link, Text} from '@chakra-ui/react';
import {format, parseISO} from 'date-fns';

import {Table, Td, Th, Tr} from './../Table';
import DeleteEquipmentButton from "@/components/equipment/DeleteEquipmentButton";
import UpdateEquipmentModal from "@/components/equipment/UpdateEquipmentModal";

const EquipmentTable = ({equipments, mutate}) => {
    return (
        <Box overflowX="scroll">
            <Table w="full">
                <thead>
                <Tr>
                    <Th>Nom</Th>
                    <Th>Marque</Th>
                    <Th>Type</Th>
                    <Th>Ajouté le</Th>
                    <Th width="50px">{''}</Th>
                </Tr>
                </thead>
                <tbody>
                {equipments.map((equipment, index) => (
                    <Box as="tr" key={equipment.id}>
                        <Td>
                            <NextLink
                                href="/equipments/[equipmentId]"
                                as={`/equipments/${equipment.id}`}
                                passHref
                            >
                                <Link id={`equipment-table-link-${index}`} fontWeight="medium">
                                    {equipment.name}
                                </Link>
                            </NextLink>
                        </Td>
                        <Td>
                            <NextLink
                                href="/equipments/[equipmentId]"
                                as={`/equipments/${equipment.id}`}
                                passHref
                            >
                                <Link id={`equipment-table-link-${index}`} fontWeight="medium">
                                    {equipment.mark}
                                </Link>
                            </NextLink>
                        </Td>
                        <Td>
                            <Text id={`equipment-table-link-${index}`} fontWeight="medium">
                                {equipment.type}
                            </Text>
                        </Td>
                        <Td>{format(parseISO(equipment?.createdAt), 'PPpp')}</Td>
                        <Td display={"flex"}>
                            <UpdateEquipmentModal equipment={equipment} mutate={mutate}/>
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
