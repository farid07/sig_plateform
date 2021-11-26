import React from 'react'
import {Flex, Icon, Link, Menu, MenuButton, Text} from '@chakra-ui/react'
import Router from "next/router";

export default function NavItem({icon, title, active, path}) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={"flex-start"}
        >
            <Menu>
                <Link
                    backgroundColor={active && "gray.200"}
                    p={3}
                    onClick={() => {
                        Router.push(`/${path}`)
                    }}
                    borderRadius={8}
                    _hover={{textDecor: 'none', backgroundColor: "gray.100"}}
                    w={"100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "gray.900" : "gray.500"}/>
                            <Text ml={5} display={"flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}