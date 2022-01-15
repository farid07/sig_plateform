import React from 'react';
import {Box, Flex, Heading, HStack,} from '@chakra-ui/react';

const NetworkHeader = ({isAdmin, mutate, title}) => {
    return (
        <Box>
            <Flex justifyContent="space-between" mb={2}>
                <Heading as={"h2"} fontSize={'18px'} mb={8}>{title || '-'}</Heading>
                <HStack spacing={4}>
                    <select>
                        <option> 1</option>
                        <option> 2</option>
                    </select>
                    <select>
                        <option> SBIN</option>
                        <option> MOOV</option>
                    </select>
                </HStack>
            </Flex>
        </Box>
    );
};

export default NetworkHeader;
