import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React from "react";
import ShowUser from "@/components/ShowUser";
import EmptyState from "@/components/EmptyState";
import ContentHeader from "@/components/ContentHeader";
import {useEffect} from "react";
import ShowOperator from "@/components/ShowOperator";
import AddUserModal from "@/components/AddUserModal";
import UsersSkeleton from "@/components/UsersSkeleton";

const UserDetail = () => {
    const router = useRouter()
    const user_id = router?.query?.id
    const {authUser} = useAuth();
    const {data, mutate} = useSWR(authUser && user_id ? [`/api/users/${user_id}`, authUser?.token] : null, fetcher);
    const isAdmin = authUser?.accountType === 'admin';
    useEffect(
        () => {
            if (!authUser) {
                router?.push("/login/email");
            }
        }, []
    )

    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Détails Utilisateurs"}>
                        {isAdmin && (
                            <AddUserModal>
                                Mettre à jour
                            </AddUserModal>
                        )}
                    </ContentHeader>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.user) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Détails Utilisateurs"}>
                        <ShowUser user={data.user} mutate={mutate} isAdmin={isAdmin}/>
                        {isAdmin && (
                            <AddUserModal>
                                Mettre à jour
                            </AddUserModal>
                        )}
                    </ContentHeader>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Détails Utilisateurs"}>
                    {isAdmin && (
                        <AddUserModal>
                            Mettre à jour
                        </AddUserModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddUserModal>Mettre à jour</AddUserModal>}
                    helpText={"Aucune information à afficher."}
                />
            </Container>
        </DashboardShell>
    );
};

const UserDetailPage = () => (
    <Page name="UserDetail" path="/users/[id]">
        <UserDetail/>
    </Page>
);

export default UserDetailPage;
