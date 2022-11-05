import React from 'react';
import {Box, Flex, Select, Heading, HStack,} from '@chakra-ui/react';
import {getOperatorEquipments} from "@/lib/db";
import {getOperators} from "@/lib/db-admin";


const NetworkHeader = ({isAdmin, mutate, operators, title, onChange}) => {

    return (
        <Box my={4} w={"full"}>
            <Flex w={"full"} justifyContent="space-between" align={"center"}>
                <Heading as={"h2"} fontSize={'18px'}>{title || '-'}</Heading>
                <HStack spacing={3}>
                    <Select onChange={onChange} placeholder="Selectionnez l'operateur:">
                        {operators.map((operator, i) => {
                            return <option key={`operator-${i}`} value={operator.userId}>{operator.name}</option>
                        })}
                    </Select>
                    {/*<Select placeholder="Selectionner l'opérateur">*/}
                    {/*    <option> </option>*/}
                    {/*    <option> </option>*/}
                    {/*</Select>*/}
                </HStack>
            </Flex>
        </Box>
    );
};

export default NetworkHeader;