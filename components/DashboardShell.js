import React from 'react';
import NextLink from 'next/link';
import {Box, Flex, Link, Avatar, Icon} from '@chakra-ui/react';

import {useAuth} from '@/lib/auth';
import Sidebar from "@/components/SideBar";
import {FiMap} from "react-icons/fi";
import Footer from "@/components/Footer";

const DashboardShell = ({children}) => {
    const {user} = useAuth();

    return (
        <Flex justify={"center"} alignItems={"center"} backgroundColor="gray.100" h="100vh" w={"full"}>
            <Sidebar/>
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

            <Flex
                  as={"main"}
                  mb={24}
                  t={0}
                  l={0}
                  zIndex={"0px"}
                  justify={"center"}
                  alignItems={"center"}
                  direction="column"
                  // maxW="1250px"
                  px={[0, 8, 8]}
            >
                {children}
                <Footer/>
            </Flex>
        </Flex>
    );
};

export default DashboardShell;
