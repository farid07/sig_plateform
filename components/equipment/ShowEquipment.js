import React from 'react';
import {Avatar, Flex, Heading, Text} from "@chakra-ui/react";

const ShowEquipment = ({equipment}) => {
    console.log(equipment)
    return (
        <Flex direction="column" align={['left', 'center']} ml={4}>

            <Heading as={"h1"} fontSize={"32px"} my={"4px"} letterSpacing="-1px">{equipment?.name}</Heading>
            <Text>{equipment?.name}</Text>
        </Flex>
    );
};

export default ShowEquipment;