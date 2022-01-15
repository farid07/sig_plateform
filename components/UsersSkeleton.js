import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';


const OperatorsSkeleton = () => {
    return (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="50px">
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
            <SkeletonCard/>
        </SimpleGrid>
    );
};

export default OperatorsSkeleton;
