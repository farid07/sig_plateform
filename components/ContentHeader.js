import React from 'react';
import {Box, Flex, Heading,} from '@chakra-ui/react';

const ContentHeader = ({children, title}) => {
    return (
        <Box>
            <Flex justifyContent="space-between" mb={2}>
                <Heading as={"h2"} mt={'10px'} fontSize={'25px'} fontFamily={"Georgia"} mb={8}>{title || '-'}</Heading>
                {children}
            </Flex>
        </Box>
    );
};

export default ContentHeader;
