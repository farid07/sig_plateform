import React from 'react';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Link,
    SimpleGrid,
    Stack,
    Text
} from "@chakra-ui/react";
import Sidebar from "@/components/SideBar";

const Container = (props) => {
    return (
        <Flex  backgroundColor={"gray.100"} direction={"column"} ml={[6, 10]} mr={[6, 10]} overflowX={"visible"}>
            <Heading as="h1" mb={8} size="md">
                Operateurs
            </Heading>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="40px" >
                <Box
                    maxW={['180px', '310px', '420px']}
                    bg={'white'}
                    boxShadow={'xl'}
                    rounded={'lg'}
                    py={6}
                    px={4}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={
                            'https://i1.wp.com/nigerianfranknewsng.com/wp-content/uploads/2018/10/MTN-logo.png?w=300&ssl=1'
                        }
                        alt={'Avatar Alt'}
                        mb={6}
                        pos={'relative'}
                    />
                    <Heading fontSize={['lg', 'xl']} fontFamily={'body'} mb={8}>
                        MTN
                    </Heading>

                    <Stack mt={6} direction={'row'}>
                        <Button
                            flex={1}
                            fontSize={'md'}
                            w={"lg"}
                            rounded={'lg'}
                            colorScheme={'teal'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 38%), 0 10px 10px -5px rgb(66 153 225 / 33%)'
                            }
                           >
                            Voir informations
                        </Button>
                    </Stack>
                </Box>
                <Box
                    maxW={['180px', '310px', '420px']}
                    bg={'white'}
                    boxShadow={'xl'}
                    rounded={'lg'}
                    py={6}
                    px={4}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={
                            'https://i1.wp.com/nigerianfranknewsng.com/wp-content/uploads/2018/10/MTN-logo.png?w=300&ssl=1'
                        }
                        alt={'Avatar Alt'}
                        mb={6}
                        pos={'relative'}
                    />
                    <Heading fontSize={['lg', 'xl']} fontFamily={'body'} mb={8}>
                        MTN
                    </Heading>

                    <Stack mt={6} direction={'row'}>
                        <Button
                            flex={1}
                            fontSize={'md'}
                            w={"lg"}
                            rounded={'lg'}
                            colorScheme={'teal'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 38%), 0 10px 10px -5px rgb(66 153 225 / 33%)'
                            }
                        >
                            Voir informations
                        </Button>
                    </Stack>
                </Box>
                <Box
                    maxW={['180px', '310px', '420px']}
                    bg={'white'}
                    boxShadow={'xl'}
                    rounded={'lg'}
                    py={6}
                    px={4}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={
                            'https://i1.wp.com/nigerianfranknewsng.com/wp-content/uploads/2018/10/MTN-logo.png?w=300&ssl=1'
                        }
                        alt={'Avatar Alt'}
                        mb={6}
                        pos={'relative'}
                    />
                    <Heading fontSize={['lg', 'xl']} fontFamily={'body'} mb={8}>
                        MTN
                    </Heading>

                    <Stack mt={6} direction={'row'}>
                        <Button
                            flex={1}
                            fontSize={'md'}
                            w={"lg"}
                            rounded={'lg'}
                            colorScheme={'teal'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 38%), 0 10px 10px -5px rgb(66 153 225 / 33%)'
                            }
                        >
                            Voir informations
                        </Button>
                    </Stack>
                </Box>
                <Box
                    maxW={['180px', '310px', '420px']}
                    bg={'white'}
                    boxShadow={'xl'}
                    rounded={'lg'}
                    py={6}
                    px={4}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={
                            'https://i1.wp.com/nigerianfranknewsng.com/wp-content/uploads/2018/10/MTN-logo.png?w=300&ssl=1'
                        }
                        alt={'Avatar Alt'}
                        mb={6}
                        pos={'relative'}
                    />
                    <Heading fontSize={['lg', 'xl']} fontFamily={'body'} mb={8}>
                        MTN
                    </Heading>

                    <Stack mt={6} direction={'row'}>
                        <Button
                            flex={1}
                            fontSize={'md'}
                            w={"lg"}
                            rounded={'lg'}
                            colorScheme={'teal'}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 38%), 0 10px 10px -5px rgb(66 153 225 / 33%)'
                            }
                        >
                            Voir informations
                        </Button>
                    </Stack>
                </Box>

            </SimpleGrid>
        </Flex>
    )
};

export default Container;