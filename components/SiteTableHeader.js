import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
    Flex,
    Box
} from '@chakra-ui/react';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = ({isPaidAccount}) => (
    <Box>
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink>Sites</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
            <Heading mb={8}>My Sites</Heading>
            {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
        </Flex>
    </Box>
);

export default SiteTableHeader;
