import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React, {useEffect} from "react";
// import ShowOperator from "@/components/ShowOperator";
import EmptyState from "@/components/EmptyState";
import AddEquipmentModal from "@/components/equipment/AddEquipmentModal";
import ContentHeader from "@/components/ContentHeader";
// import OperatorsSkeleton from "@/components/OperatorsSkeleton";

const EquipmentDetail = () => {
    const router = useRouter()
    const equipment_id = router?.query?.id
    const {authUser} = useAuth();
    const {data} = useSWR(authUser && equipment_id ? [`/api/equipments/${equipment_id}`, authUser?.token] : null, fetcher);
    const isAdmin = authUser?.accountType !== 'operator';

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
                    <ContentHeader title={"Détails Equipments"}>
                        {isAdmin && (
                            <AddEquipmentModal>
                                Mettre à jour
                            </AddEquipmentModal>
                        )}
                    </ContentHeader>
                    <OperatorsSkeleton/>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.operator) {
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
                    <ShowOperator operator={data.operator}/>
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
