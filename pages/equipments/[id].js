import useSWR from 'swr';
import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React, {useEffect} from "react";
import ShowEquipment from "@/components/equipment/ShowEquipment";
import EmptyState from "@/components/EmptyState";
import AddEquipmentModal from "@/components/equipment/AddEquipmentModal";
import ContentHeader from "@/components/ContentHeader";
import EquipmentsSkeleton from "@/components/equipment/EquipmentsSkeleton";

const EquipmentDetail = () => {
    const router = useRouter()
    const equipment_id = router?.query?.id
    const {authUser} = useAuth();
    const {
        data,
        mutate
    } = useSWR(authUser && equipment_id ? [`/api/equipments/${equipment_id}`, authUser?.token] : null, fetcher);
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
                    <ContentHeader title={"Détails Equipments"}>
                        {isAdmin && (
                            <AddEquipmentModal>
                                Mettre à jour
                            </AddEquipmentModal>
                        )}
                    </ContentHeader>
                    <EquipmentsSkeleton/>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.equipment) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Détails Equipements"}>
                        <ShowEquipment equipment={data.equipment} mutate={mutate} isAdmin={isAdmin}/>
                        {isAdmin && (
                            <AddEquipmentModal>
                                Mettre à jour
                            </AddEquipmentModal>
                        )}
                    </ContentHeader>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Détails Equipements"}>
                    {isAdmin && (
                        <AddEquipmentModal>
                            Mettre à jour
                        </AddEquipmentModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddEquipmentModal>Mettre à jour</AddEquipmentModal>}
                    helpText={"Aucune information à afficher."}
                />
            </Container>
        </DashboardShell>
    );
};

const EquipmentDetailPage = () => (
    <Page name="EquipmentDetail" path="/equipments/[id]">
        <EquipmentDetail/>
    </Page>
);

export default EquipmentDetailPage;
