import React from 'react';
import {Avatar, Badge, Box, Center, Flex, Stack, Heading, Text} from "@chakra-ui/react";

const ShowOperator = ({operator, mutate, isAdmin}) => {

    return (
        <Center>
            <Box
                mt={'60px'}
                mr={'350px'}
                ml={'60px'}
                w={'400px'}
                h={'400px'}
                bg={'blue.500'}
                fontSize={'25px'}
                color={'white'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                fontFamily={'Georgia'}
            >
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
                <Heading fontSize={'25px'} fontFamily={'Georgia'}>
                    {operator?.name}
                </Heading>

                <Flex direction={'column'} mt={6}>
                    <div><strong>Email : </strong> {operator?.email} </div>
                    <br/>
                    <div><strong> Site Web : </strong> {operator?.url} </div>
                    <br/>
                </Flex>
            </Box>
        </Center>
    );
};

export default ShowOperator;