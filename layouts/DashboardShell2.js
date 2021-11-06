import React  from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import NextLink from "next/link";
import {FiMap} from "react-icons/fi";
import Sidebar from "@/components/SideBar";

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function DashboardShell2({children}) {
    return (
        <>
            <Box bg={'gray.100'}>
                <Sidebar/>
                <Flex
                    h={16}
                    px={4}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    w="full"
                    position={"fixed"}
                    borderTop="5px solid"
                    zIndex={"20px"}
                    mb={[8, 16]}
                    borderTopColor={"#72c8dc"}
                    backgroundColor="white"
                    boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                >
                    <HStack spacing={8} alignItems={'center'}>
                        <NextLink href="/" passHref>
                            <Link
                                fontWeight={"bold"}
                                _hover={{
                                    textDecoration: 'none',
                                }}
                            >
                                <Icon as={FiMap} w="24px" h={"24px"} mr={4}/>
                                <Box as={"span"} >
                                    Plateforme Sig
                                </Box>
                            </Link>
                        </NextLink>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}>
                            Action
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>

            <Flex pl={"286px"} pt={"105px"}  minWidth={"calc(1250px - 250px)"} bg={'gray.100'} h={"100vh"} justifyContent={"flex-start"} alignItems={"flex-start"}>{children}</Flex>
        </>
    );
}