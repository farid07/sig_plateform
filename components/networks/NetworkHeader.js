import React from 'react';
import {Box, Flex, Select, Heading, HStack,} from '@chakra-ui/react';

const NetworkHeader = ({isAdmin, mutate, operators, title}) => {
    return (
        <Box>
            <Flex justifyContent="space-between" mb={2}>
                <Heading as={"h2"} fontSize={'18px'} mb={8}>{title || '-'}</Heading>
                <HStack spacing={3}>
                    <Select placeholder="Type d'infrastructure">
                        <option>Optique</option>
                        <option>Non optique</option>
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