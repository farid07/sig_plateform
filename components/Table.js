import React from 'react';
import {Box, Text} from '@chakra-ui/react';

export const Th = (props) => (
    <Text
        as="th"
        textTransform="uppercase"
        fontSize="22px"
        color="white"
        backgroundColor="blue.700"
        fontWeight="bold"
        px={4}
        {...props}
    />
);

export const Td = (props) => (
    <Box
        as="td"
        color="white"
        p={4}
        fontSize="17px"
        borderBottom="1px solid"
        borderBottomColor="gray.100"
        {...props}
    />
);

export const Tr = (props) => (
    <Box
        as="tr"
        backgroundColor="gray.50"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        height="40px"
        {...props}
    />
);

export const Table = (props) => {
    return (
        <Box
            as="table"
            textAlign="center"
            backgroundColor="blue.600"
            ml={0}
            mr={0}
            borderRadius={8}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
            {...props}
        />
    );
};
