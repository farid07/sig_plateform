import React from 'react';
import NextLink from 'next/link';
import {Box, Flex, Link, Avatar, Icon, Stack} from '@chakra-ui/react';

import {useAuth} from '@/lib/auth';
import {FiMap} from "react-icons/fi";

const DashboardShell = ({children}) => {
    const {user} = useAuth();

    return (
        <Flex justifyContent={"flex-start"} alignContent={"flex-start"} backgroundColor="gray.100" h="100vh" w={"full"}>
            <Flex
                as={"header"}
                backgroundColor="white"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                top={0}
                position={"fixed"}
                zIndex={"20px"}
                mb={[8, 16]}
                w="full"
                justifyContent={"center"}
                alignItems={"center"}
                borderTop="5px solid"
                borderTopColor={"#72c8dc"}
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    pt={4}
                    pb={4}
                    maxW="full"
                    margin="0 auto"
                    w="full"
                    px={8}
                    h="60px"
                >
                    <Flex align="center">
                        <NextLink href="/" passHref>
                            <Link fontWeight={"bold"}>
                                <Icon as={FiMap} w="24px" h={"24px"} mr={4}/>
                                <Box as={"span"} >
                                    Plateforme Sig
                                </Box>
                            </Link>
                        </NextLink>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <NextLink href="/account" passHref>
                            <Link>
                                <Avatar size="sm" src={user?.photoUrl}/>
                            </Link>
                        </NextLink>
                    </Flex>
                </Flex>
            </Flex>
            <Stack pl={["250px", "300px"]} pr={"90px"} flexDirection="row">
                {children}
            </Stack>
        </Flex>
    );
};

export default DashboardShell;
