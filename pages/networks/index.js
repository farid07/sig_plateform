import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React from "react";
{/*import ShowOperators from "@/components/ShowOperators";*/}
import EmptyState from "@/components/EmptyState";
import AddOperatorModal from "@/components/AddOperatorModal";
import ContentHeader from "@/components/ContentHeader";
import OperatorsSkeleton from "@/components/OperatorsSkeleton";

const Network = () => {
    const {router} = useRouter();
    const {authUser} = useAuth();
    const {data} = useSWR(authUser ? ['/api/networks', authUser.token] : null, fetcher);
    const isAdmin = authUser?.accountType !== 'operator';
    if (!authUser) {
        router?.push("/login/email");
    }

    console.log(data)

    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={" "}>
                        {isAdmin && (
                            <AddOperatorModal>
                                Ajouter
                            </AddOperatorModal>
                        )}
                    </ContentHeader>
                    <OperatorsSkeleton/>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.operators?.length) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Networks"}>
                        {isAdmin && (
                            <AddOperatorModal>
                                Ajouter
                            </AddOperatorModal>
                        )}
                    </ContentHeader>
                    <ShowOperators operators={data.operators}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Equipements"}>
                    {isAdmin && (
                        <AddOperatorModal>
                            Ajouter
                        </AddOperatorModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddOperatorModal>Ajoutez un réseau</AddOperatorModal>}
                    helpText={"Aucun réseau trouvé."}
                    subHelpText={"Commençons."}
                />
            </Container>
        </DashboardShell>
    );
};

const NetworkPage = () => (
    <Page name="Network" path="/network">
        <Network/>
    </Page>
);

export default NetworkPage;
