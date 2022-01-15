import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
<<<<<<< HEAD
import React from "react";
import ShowUser from "@/components/ShowUser";
import EmptyState from "@/components/EmptyState";
import ContentHeader from "@/components/ContentHeader";
=======
import React, {useEffect} from "react";
import ShowOperator from "@/components/ShowOperator";
import EmptyState from "@/components/EmptyState";
import AddUserModal from "@/components/AddUserModal";
import ContentHeader from "@/components/ContentHeader";
import UsersSkeleton from "@/components/UsersSkeleton";
>>>>>>> a9be682 (simple commit)

const UserDetail = () => {
    const router = useRouter()
    const user_id = router?.query?.id
    const {authUser} = useAuth();
<<<<<<< HEAD
    const {data, mutate} = useSWR(authUser && user_id ? [`/api/users/${user_id}`, authUser?.token] : null, fetcher);
    const isAdmin = authUser?.accountType === 'admin';
    // useEffect(
    //     () => {
    //         if (!authUser) {
    //             router?.push("/login/email");
    //         }
    //     }, []
    // )
=======
    const {data} = useSWR(authUser && user_id ? [`/api/users/${user_id}`, authUser?.token] : null, fetcher);
    const isAdmin = authUser?.accountType === 'admin';

    useEffect(
        () => {
            if (!authUser) {
                router?.push("/login/email");
            }
        }, []
    )
>>>>>>> a9be682 (simple commit)

    if (!data) {
        return (
            <DashboardShell>
                <Container>
<<<<<<< HEAD
                    <ContentHeader title={"Détails Utilisateurs"}/>
                    {/*<UsersSkeleton/>*/}
=======
                    <ContentHeader title={"Détails Utilisateurs"}>
                        {isAdmin && (
                            <AddUserModal>
                                Mettre à jour
                            </AddUserModal>
                        )}
                    </ContentHeader>
                    <UsersSkeleton/>
>>>>>>> a9be682 (simple commit)
                </Container>
            </DashboardShell>
        );
    }

    if (data?.user) {
        return (
            <DashboardShell>
                <Container>
<<<<<<< HEAD
                    <ContentHeader title={"Détails Utilisateurs"}/>
                    <ShowUser user={data.user} mutate={mutate} isAdmin={isAdmin}/>
=======
                    <ContentHeader title={"Détails Utilisateurs"}>
                        {isAdmin && (
                            <AddUserModal>
                                Mettre à jour
                            </AddUserModal>
                        )}
                    </ContentHeader>
                    <ShowUser user={data.user}/>
>>>>>>> a9be682 (simple commit)
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
<<<<<<< HEAD
                <ContentHeader title={"Détails Utilisateurs"}/>
                <EmptyState
=======
                <ContentHeader title={"Détails Utilisateurs"}>
                    {isAdmin && (
                        <AddUserModal>
                            Mettre à jour
                        </AddUserModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddUserModal>Mettre à jour</AddUserModal>}
>>>>>>> a9be682 (simple commit)
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
