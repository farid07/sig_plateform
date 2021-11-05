import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from '@/components/NavHoverBox'

export default function NavItem({ icon, title, description, active }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={"flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "gray.200"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "gray.100" }}
                    w={"100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "gray.900" : "gray.500"} />
                            <Text ml={5} display={"flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>
        </Flex>
    )
}