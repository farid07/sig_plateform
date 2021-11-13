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
import {useAuth} from "@/lib/auth";

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
    const {user} = useAuth();
    return (
        <>
            <Box bg={'gray.100'}>
                <Flex
                    h={16}
                    px={6}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    w="full"
                    position={"fixed"}
                    borderTop="5px solid"
                    zIndex={1500}
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
                                    PLATEFORME SIG
                                </Box>
                            </Link>
                        </NextLink>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={6}
                            leftIcon={<AddIcon />}>
                            Action
                        </Button>
                        <NextLink href="/account" passHref>
                            <Link>
                                <Avatar size="sm" src={user?.photoUrl}/>
                            </Link>
                        </NextLink>
                    </Flex>
                </Flex>
                <Sidebar/>
            </Box>

            <Flex pl={"286px"} pt={"105px"}  minWidth={"calc(18%)"} bg={'gray.100'} h={"100vh"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                {children}
            </Flex>
        </>
    );
}