import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React, {useEffect} from "react";
import ShowOperator from "@/components/ShowOperator";
import EmptyState from "@/components/EmptyState";
import AddOperatorModal from "@/components/AddOperatorModal";
import ContentHeader from "@/components/ContentHeader";
import ShowUser from "@/components/ShowUser";

const OperatorDetail = () => {
    const router = useRouter()
    const operator_id = router?.query?.id
    const {authUser} = useAuth();
    const {data, mutate} = useSWR(authUser && operator_id ? [`/api/operators/${operator_id}`, authUser?.token] : null, fetcher);
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
                    <ContentHeader title={"Détails Opérateurs"}>
                        {isAdmin && (
                            <AddOperatorModal>
                                Mettre à jour
                            </AddOperatorModal>
                        )}
                    </ContentHeader>
                    {/*<OperatorsSkeleton/>*/}
                </Container>
            </DashboardShell>
        );
    }

    if (data?.operator) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Détails Opérateurs"}>
                        <ShowOperator operator={data.operator} mutate={mutate} isAdmin={isAdmin}/>
                        {isAdmin && (
                            <AddOperatorModal>
                                Mettre à jour
                            </AddOperatorModal>
                        )}
                    </ContentHeader>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Détails Opérateurs"}>
                    {isAdmin && (
                        <AddOperatorModal>
                            Mettre à jour
                        </AddOperatorModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddOperatorModal>Mettre à jour</AddOperatorModal>}
                    helpText={"Aucune information à afficher."}
                />
            </Container>
        </DashboardShell>
    );
};

const OperatorDetailPage = () => (
    <Page name="OperatorDetail" path="/operators/[id]">
        <OperatorDetail/>
    </Page>
);

export default OperatorDetailPage;
