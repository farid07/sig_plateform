import React from 'react';
import {Box, SimpleGrid, Skeleton} from '@chakra-ui/react';

const SkeletonCard = () => (
    <Box
        display={"flex"}
        flexDirection={"column"}
        maxW={['180px', '310px', '420px']}
        maxH={['180px', '310px', '420px']}
        bg={'white'}
        boxShadow={'xl'}
        rounded={'lg'}
        justifyContent={"center"}
        alignItems={"center"}
        py={6}
        px={4}
        textAlign={'center'}
    >
        <Skeleton
            size={'xl'}
            rounded={'full'}
            w={"90px"}
            h={"90px"}
            src={""}
            alt={'Avatar Alt'}
            mb={6}
            pos={'relative'}
        />
        <Skeleton height="25px" w={"150px"} rounded={"md"} mb={4}/>
        <Skeleton
            mt={6}
            height="35px"
            w={"210px"}
            rounded={"full"}
        />
    </Box>
);

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
