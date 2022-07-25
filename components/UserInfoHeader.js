import React from 'react';
import {Box, Flex, Heading} from '@chakra-ui/react';

import EditUserModal from './EditUserModal';

const UserInfoHeader = ({displayName, userId, isAdmin}) => {
    return (
        <Box mx={4}>
            <Flex justifyContent="space-between" mb={2}>
                <Heading as={"h2"} fontSize={'18px'} mb={8}>{"Utilisateurs > "}{displayName}</Heading>
                {isAdmin && (
                    <EditUserModal userId={userId}>
                        Modifier
                    </EditUserModal>
                )}
            </Flex>
        </Box>
    );
};

export default UserInfoHeader;
