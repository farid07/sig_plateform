import React from 'react';
import {Box, Flex, Heading,} from '@chakra-ui/react';
import AddUserModal from "./AddUserModal";

const UsersHeader = ({isAdmin, mutate, title}) => {
    return (
        <Box>
            <Flex justifyContent="space-between" mb={2}>
                <Heading as={"h2"} fontSize={'18px'} mb={8}>{title || '-'}</Heading>
                {isAdmin && (
                    <AddUserModal mutate={mutate}>
                        Ajouter
                    </AddUserModal>
                )}
            </Flex>
        </Box>
    );
};

export default UsersHeader;
