import React from 'react';
import {Avatar, Box, Button, Center, Flex, Heading, Text} from "@chakra-ui/react";
import AddImages from "@/components/AddImages";
import {mutate} from "swr";
import AddImageModal from "@/components/equipment/AddImageModal";


const ShowEquipment = ({equipment}) => {
    return (
        <Center>
            <Box
                mt={'20px'}
                mr={'330px'}
                ml={'10px'}
                w={'400px'}
                h={'full'}
                bg={'blue.200'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
            >
                <Avatar
                    size={'xxl'}
                    src={equipment?.logo}
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
                <Heading as={"h1"} fontSize={"32px"} my={"4px"} letterSpacing="-1px">{equipment?.name}</Heading>
                <br/>
                <Flex direction="column" align={['left', 'center']} ml={4}>
                    <div><strong> MARQUE : </strong> {equipment?.mark} </div>
                    <br/>
                    <div><strong> TYPE : </strong> {equipment?.type} </div>
                    <br/>
                    <div><strong> LONGITUDE : </strong> {equipment?.longitude} </div>
                    <br/>
                    <div><strong> LATITUDE : </strong> {equipment?.latitude} </div>
                    <br/>
                    <div><strong> NOMBRE DE PORTS : </strong> {equipment?.ports} </div>
                    <br/>
                    <div><strong> NOMBRE DE PORTS OCCUPES : </strong> {equipment?.portsOccupes} </div>
                    <br/>
                    <div><strong> PHOTOS : </strong>{equipment?.photos?.map((equipment, ind) => {
                        return <><img src={equipment}/><br/></>
                    })} </div>
                    <br/>
                </Flex>
                <AddImageModal equipment={equipment} mutate={mutate}>
                    Ajouter des photos
                </AddImageModal>
            </Box>
        </Center>
    );
};

export default ShowEquipment;