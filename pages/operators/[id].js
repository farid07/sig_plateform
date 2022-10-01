import useSWR from 'swr';
import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React, {useEffect} from "react";
import ShowOperator from "@/components/operators/ShowOperator";
import EmptyState from "@/components/EmptyState";
import UpdateOperatorModal from "@/components/operators/UpdateOperatorModal";
import ContentHeader from "@/components/ContentHeader";

const OperatorDetail = () => {
    const router = useRouter()
    const operator_id = router?.query?.id
    const {authUser} = useAuth();
    const {
        data,
        mutate
    } = useSWR(authUser && operator_id ? [`/api/operators/${operator_id}`, authUser?.token] : null, fetcher);
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
                    <ContentHeader title={"Détails Opérateurs"} fontFamily={'Georgia'}>
                        {isAdmin && (
                            <UpdateOperatorModal>
                                Mettre à jour
                            </UpdateOperatorModal>
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
                    <ContentHeader title={"Détails Opérateurs"} fontFamily={'Georgia'}>
                        <ShowOperator operator={data.operator} mutate={mutate} isAdmin={isAdmin}/>
                        {isAdmin && (
                            <UpdateOperatorModal>
                                Mettre à jour
                            </UpdateOperatorModal>
                        )}
                    </ContentHeader>
                </Container>
            </DashboardShell>
        );
    }
    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Détails Opérateurs"} fontFamily={'Geogia'}>
                    {isAdmin && (
                        <UpdateOperatorModal>
                            Mettre à jour
                        </UpdateOperatorModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<UpdateOperatorModal>Mettre à jour</UpdateOperatorModal>}
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
