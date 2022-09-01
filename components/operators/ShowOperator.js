import React from 'react';
import {Avatar, Badge, Box, Center, Flex, Stack, Heading, Text} from "@chakra-ui/react";

const ShowOperator = ({operator, mutate, isAdmin}) => {

    return (
        <Center>
            <Box
                mt={'60px'}
                mr={'430px'}
                w={'full'}
                h={'400px'}
                bg={'white'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
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
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {operator?.name}
                </Heading>

                <Flex direction={'column'} mt={6}>
                    <div><strong>Email : </strong> {operator?.email} </div>
                    <br/>
                    <div><strong> Site Web : </strong> {operator?.url} </div>
                    <br/>
                    <div><strong> Contact : </strong> 21 00 00 00</div>
                </Flex>
            </Box>
        </Center>
    );
};

export default ShowOperator;