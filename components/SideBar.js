import React, {useState} from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading, Box
} from '@chakra-ui/react'
import {
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import {IoPawOutline} from 'react-icons/io5'
import NavItem from '@/components/NavItem'

export default function Sidebar() {
    return (
        <Flex
            display={"flex"}
            pos={"fixed"}
            bg={"gray.50"}
            left="0"
            top={"64px"}
            zIndex={"10px"}
            h="full"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.07)"
            w={{base:"200px", lg:"250px"}}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                px="5%"
                py={2}
                flexDir="column"
                w="100%"
                alignItems={"flex-start"}
                as="nav"
            >
                <NavItem icon={FiHome} title="Accueil"
                         description="This is the description for the dashboard." active/>
                <NavItem icon={FiCalendar} title="Operateurs"/>
                <NavItem icon={FiUser} title="Utilisateurs"/>
                <NavItem icon={IoPawOutline} title="Equipements"/>
                <NavItem icon={FiDollarSign} title="Réseaux"/>
                <NavItem icon={FiSettings} title="Parametres"/>
            </Flex>
        </Flex>
    )
}