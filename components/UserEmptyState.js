import React from 'react';
import {Flex, Heading, Text} from '@chakra-ui/react';

import AddUserModal from './AddUserModal';

const EmptyState = ({mutate}) => (
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
        Aucun utilisateur trouvé.
      </Heading>
        <Text mb={4}>Commençons.</Text>
        <AddUserModal mutate={mutate}>Ajoutez un utilisateur</AddUserModal>
    </Flex>
);

export default EmptyState;
