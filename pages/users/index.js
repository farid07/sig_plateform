import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React from "react";
import UserEmptyState from '@/components/UserEmptyState';
import UsersHeader from "@/components/UsersHeader";
import UserTableSkeleton from "@/components/UserTableSkeleton";
import UserTable from "@/components/UserTable";

const Users = () => {
    const {router} = useRouter();
    const {authUser} = useAuth();
    const {data, mutate} = useSWR(authUser ? ['/api/users', authUser.token] : null, fetcher);
    const isAdmin = authUser?.accountType !== 'operator';

    if (!authUser) {
        router?.push("/login/email");
    }

    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    <UsersHeader mutate={mutate} isAdmin={isAdmin} title={"Utilisateurs"}/>
                    <UserTableSkeleton/>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.users?.length) {
        return (
            <DashboardShell>
                <Container>
                    <UsersHeader mutate={mutate} isAdmin={isAdmin} title={"Utilisateurs"}/>
                    <UserTable users={data.users} mutate={mutate}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <UsersHeader mutate={mutate} isAdmin={isAdmin} title={"Utilisateurs"}/>
                <UserEmptyState mutate={mutate}/>
            </Container>
        </DashboardShell>
    );
};

const UsersPage = () => (
    <Page name="Utilisateurs" path="/users">
        <Users/>
    </Page>
);

export default UsersPage;
