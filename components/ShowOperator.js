import React from 'react';
import {Avatar, Badge, Box, Center, Flex, Stack, Heading, Text} from "@chakra-ui/react";

const ShowOperator = ({operator, mutate, isAdmin}) => {
    return (

        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={'white'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={operator?.logo}
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {operator?.name}
                </Heading>

                <Flex alignItem={'center'} justifyContent={'space-between'} direction={'column'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={'red.100'}
                        fontWeight={'400'}>
                        {operator?.email}
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={'green.300'}
                        fontWeight={'400'}>
                        {operator?.url}
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={'red.100'}
                        fontWeight={'400'}>
                        {operator?.url}
                    </Badge>
                </Flex>
                {/*
                <Center mt={8}>
                    {isAdmin && (<UpdateUserModal mutate={mutate} user={user} size={"42px"}/>)}
                </Center>
                */}
            </Box>
        </Center>

    );
};

export default ShowOperator;