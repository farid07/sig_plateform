import React from 'react';
import {Box, Skeleton} from '@chakra-ui/react';
import {Table, Td, Th, Tr} from './../Table';

const SkeletonRow = ({width}) => (
    <Box as="tr">
        <Td>
            <Skeleton height="10px" w={width} my={4}/>
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4}/>
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4}/>
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4}/>
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4}/>
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4}/>
        </Td>
    </Box>
);

const EquipmentsSkeleton = () => {
    return (
        <Table color={'white'}>
            <thead>
            <Tr>
                <Th> Nom </Th>
                <Th> Longitude </Th>
                <Th> Latitude </Th>
                <Th> Type </Th>
                <Th>Ajouté le</Th>
                <Th width="50px">{''}</Th>
            </Tr>
            </thead>
            <tbody>
            <SkeletonRow width="125px"/>
            <SkeletonRow width="125px"/>
            <SkeletonRow width="125px"/>
            <SkeletonRow width="75px"/>
            <SkeletonRow width="50px"/>
            <SkeletonRow width="75px"/>
            </tbody>
        </Table>
    );
};

export default EquipmentsSkeleton;
