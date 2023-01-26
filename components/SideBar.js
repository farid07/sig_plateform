import React from 'react'
import {Flex} from '@chakra-ui/react'
import {FiCalendar, FiHome, FiSettings, FiUser} from 'react-icons/fi'
import {IoPawOutline} from 'react-icons/io5'
import NavItem from '@/components/NavItem'
import {useRouter} from "next/router";
import {FaNetworkWired} from "react-icons/fa";
import {useAuth} from "@/lib/auth";

export default function Sidebar() {
    const {authUser} = useAuth();
    const isAdmin = authUser?.accountType !== 'operator';
    const isOperator = authUser?.accountType === 'operator';

    const router = useRouter()
    return (
        <Flex
            display={"flex"}
            pos={"fixed"}
            bg={"blue.500"}
            fontWeight={'bold'}
            left="0"
            pt={16}
            zIndex={1100}
            h="full"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.07)"
            w={{base: "20px", lg: "225px"}}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                px="0%"
                py={2}
                flexDir="column"
                w="90%"
                alignItems={"flex-start"}
                as="nav"
                fontWeight={'bold'}
                color={'white'}
                fontSize={'25px'}

            >
                <NavItem path={"dashboard"} icon={FiHome} title="Accueil"
                         description="This is the description for the dashboard."
                         active={router.pathname === "/dashboard"}/>
                <NavItem path={"operators"} icon={FiCalendar} title="Operateurs"
                         active={router.pathname === "/operators"}/>
                {isAdmin &&
                    <NavItem path={"users"} icon={FiUser} title="Utilisateurs"
                             active={router.pathname === "/users"}/>}
                {isOperator &&
                    <NavItem path={"equipments"} icon={IoPawOutline} title="Infrastructures"
                             active={router.pathname === "/equipments"}/>}
                {isOperator &&
                    <NavItem path={"networks"} icon={FaNetworkWired} title="Réseaux"
                             active={router.pathname === "/networks"}/>}
                <NavItem path={"account"} icon={FiSettings} title="Parametres" active={router.pathname === "/account"}/>
            </Flex>
        </Flex>
    )
}