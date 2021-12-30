import React from 'react';
import {Avatar, Flex, Heading, Text} from "@chakra-ui/react";

const ShowOperator = ({operator}) => {
    console.log(operator)
    return (
        <Flex direction="column" align={['left', 'center']} ml={4}>
            <Avatar
                w={['3rem', '6rem']}
                h={['3rem', '6rem']}
                mb={4}
                src={operator?.logo}
            />
            <Heading as={"h1"} fontSize={"32px"} my={"4px"} letterSpacing="-1px">{operator?.name}</Heading>
            <Text>{operator?.name}</Text>
        </Flex>
    );
};

export default ShowOperator;