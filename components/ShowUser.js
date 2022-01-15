import React from 'react';
import {Avatar, Badge, Box, Center, Heading, Stack, Text} from "@chakra-ui/react";
import UpdateUserModal from "@/components/UpateUserModal";

const ShowUser = ({user, mutate, isAdmin}) => {
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
                    src={user?.photoUrl}
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
                    {user?.displayName}
                </Heading>
                <Text
                    textAlign={'center'}
                    color={'gray.700'}
                    px={3}>
                    {user?.email}
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={'red.100'}
                        fontWeight={'400'}>
                        {user?.accountType}
                    </Badge>
                </Stack>

                <Center mt={8}>
                    {isAdmin && (<UpdateUserModal mutate={mutate} user={user} size={"42px"}/>)}
                </Center>
            </Box>
        </Center>
    );
};

export default ShowUser;