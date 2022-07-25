import React from 'react';
import NextLink from 'next/link';
import {Avatar, Box, Button, Heading, SimpleGrid, Stack} from "@chakra-ui/react";
import DeleteOperatorButton from "@/components/operators/DeleteOperatorButton";

const ShowOperators = ({mutate, operators, isAdmin,}) => {
    console.log(operators)
    return (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="50px">
            {operators.map((operator, index) => (
                <Box
                    maxW={['180px', '310px', '420px']}
                    bg={'white'}
                    boxShadow={'xl'}
                    rounded={'lg'}
                    py={6}
                    px={4}
                    textAlign={'center'}
                    key={operator.id}
                >
                    <Avatar
                        size={'xl'}
                        src={
                            `${operator.logo}`
                        }
                        alt={'Avatar Alt'}
                        mb={6}
                        pos={'relative'}
                    />
                    <Heading fontSize={['lg', 'xl']} fontFamily={'body'} mb={8}>
                        {operator.name}
                    </Heading>

                    <Stack mt={6} direction={'row'}>
                        <NextLink
                            href="/operators/[id]"
                            as={`/operators/${operator.id}`}
                            passHref
                        >
                            <Button
                                flex={1}
                                as={"a"}
                                fontSize={'sm'}
                                w={"lg"}
                                rounded={'lg'}
                                colorScheme={'teal'}
                                boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 38%), 0 10px 10px -5px rgb(66 153 225 / 33%)'
                                }
                            >
                                Voir informations
                            </Button>
                        </NextLink>
                        {isAdmin && (
                            <DeleteOperatorButton mutate={mutate} operatorId={operator.id}/>)}
                    </Stack>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default ShowOperators;