import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React from "react";
import ShowOperators from "@/components/ShowOperators";
import EmptyState from "@/components/EmptyState";
import AddOperatorModal from "@/components/AddOperatorModal";
import ContentHeader from "@/components/ContentHeader";
import OperatorsSkeleton from "@/components/OperatorsSkeleton";

const Operator = () => {
    const {router} = useRouter();
    const {authUser} = useAuth();
    console.log(authUser)
    const {data, mutate} = useSWR(authUser ? ['/api/operators/', authUser?.token] : null, fetcher);
    const isAdmin = authUser?.accountType === 'admin';
    if (!authUser) {
        router?.push("/login/email");
    }

    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Opérateurs"}>
                        {isAdmin && (
                            <AddOperatorModal mutate={mutate}>
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
                    <ContentHeader title={"Opérateurs"}>
                        {isAdmin && (
                            <AddOperatorModal mutate={mutate}>
                                Ajouter
                            </AddOperatorModal>
                        )}
                    </ContentHeader>
                    <ShowOperators isAdmin={isAdmin} mutate={mutate} operators={data.operators}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Opérateurs"}>
                    {isAdmin && (
                        <AddOperatorModal mutate={mutate}>
                            Ajouter
                        </AddOperatorModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddOperatorModal mutate={mutate}>Ajoutez un opérateur</AddOperatorModal>}
                    helpText={"Aucun opérateur trouvé."}
                    subHelpText={"Commençons."}
                />
            </Container>
        </DashboardShell>
    );
};

const OperatorPage = () => (
    <Page name="Operator" path="/operator">
        <Operator/>
    </Page>
);

export default OperatorPage;
