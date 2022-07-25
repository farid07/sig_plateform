import React from 'react';
import NextLink from 'next/link';
import {Box, Link, Text} from '@chakra-ui/react';
import {format, parseISO} from 'date-fns';

import {Table, Td, Th, Tr} from './Table';
import DeleteUserButton from './DeleteUserButton';
import UpdateUserModal from "@/components/UpateUserModal";

const UserTable = ({users, mutate}) => {
    return (
        <Box overflowX="scroll">
            <Table w="full">
                <thead>
                <Tr>
                    <Th>Nom</Th>
                    <Th>Prénoms</Th>
                    <Th>Email</Th>
                    <Th>Type</Th>
                    <Th>Ajouté le</Th>
                    <Th width="50px">{''}</Th>
                </Tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <Box as="tr" key={user.id}>
                        <Td>
                            <NextLink
                                href="/users/[id]"
                                as={`/users/${user.id}`}
                                passHref
                            >
                                <Link id={`user-table-link-${index}`} fontWeight="medium">
                                    {user.first_name}
                                </Link>
                            </NextLink>
                        </Td>
                        <Td>
                            <NextLink
                                href="/users/[id]"
                                as={`/users/${user.id}`}
                                passHref
                            >
                                <Link id={`user-table-link-${index}`} fontWeight="medium">
                                    {user.last_name}
                                </Link>
                            </NextLink>
                        </Td>
                        <Td>
                            <NextLink
                                href="/users/[id]"
                                as={`/users/${user.id}`}
                                passHref
                            >
                                <Link id={`user-table-link-${index}`} fontWeight="medium">
                                    {user.email}
                                </Link>
                            </NextLink>
                        </Td>
                        <Td>
                            <Text id={`user-table-link-${index}`} fontWeight="medium">
                                {user.accountType}
                            </Text>
                        </Td>
                        <Td>{format(parseISO(user?.createdAt), 'PPpp')}</Td>
                        <Td display={"flex"}>
                            <UpdateUserModal user={user} mutate={mutate}/>
                            <DeleteUserButton userId={user.id}/>
                        </Td>
                    </Box>
                ))}
                </tbody>
            </Table>
        </Box>
    );
};

export default UserTable;
