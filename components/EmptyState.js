import React from 'react';
import {Flex, Heading, Text} from '@chakra-ui/react';

const EmptyState = ({button, helpText, subHelpText}) => (
    <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="8px"
        p={16}
        justify="center"
        align="center"
        direction="column"
    >
        <Heading size="lg" mb={2}>
            {helpText}
        </Heading>
        <Text mb={4}>{subHelpText}</Text>
        {button}
    </Flex>
);

export default EmptyState;
