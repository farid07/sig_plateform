import React from 'react'
import {Flex} from '@chakra-ui/react'
import {FiCalendar, FiDollarSign, FiHome, FiSettings, FiUser} from 'react-icons/fi'
import {IoPawOutline} from 'react-icons/io5'
import NavItem from '@/components/NavItem'
import {useRouter} from "next/router";

export default function Sidebar() {
    const router = useRouter()
    return (
        <Flex
            display={"flex"}
            pos={"fixed"}
            bg={"gray.50"}
            left="0"
            pt={16}
            zIndex={1100}
            h="full"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.07)"
            w={{base:"250px", lg:"250px"}}
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
                <NavItem path={"dashboard"} icon={FiHome} title="Accueil"
                         description="This is the description for the dashboard."
                         active={router.pathname === "/dashboard"}/>
                <NavItem path={"operators"} icon={FiCalendar} title="Operateurs"
                         active={router.pathname === "/operators"}/>
                <NavItem path={"users"} icon={FiUser} title="Utilisateurs" active={router.pathname === "/users"}/>
                <NavItem path={"equipments"} icon={IoPawOutline} title="Equipements"
                         active={router.pathname === "/equipments"}/>
                <NavItem path={"networks"} icon={FiDollarSign} title="Réseaux"
                         active={router.pathname === "/networks"}/>
                <NavItem path={"account"} icon={FiSettings} title="Parametres" active={router.pathname === "/account"}/>
            </Flex>
        </Flex>
    )
}