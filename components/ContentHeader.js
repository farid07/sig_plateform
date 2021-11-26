import React from 'react';
import {Box, Flex, Heading,} from '@chakra-ui/react';
import AddOperatorModal from "./AddOperatorModal";

const ContentHeader = ({isAdmin, title}) => {
    return (
        <Box>
            <Flex justifyContent="space-between" mb={2}>
                <Heading as={"h2"} fontSize={'18px'} mb={8}>{title || '-'}</Heading>
                {isAdmin && (
                    <AddOperatorModal>
                        Ajouter
                    </AddOperatorModal>
                )}
            </Flex>
        </Box>
    );
};

export default ContentHeader;
