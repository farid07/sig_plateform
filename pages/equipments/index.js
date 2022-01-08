import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React from "react";
import EmptyState from "@/components/EmptyState";
import AddEquipmentModal from "@/components/equipment/AddEquipmentModal";
import ContentHeader from "@/components/ContentHeader";
import EquipmentsSkeleton from "@/components/equipment/EquipmentsSkeleton";
import EquipmentTable from "@/components/equipment/EquipmentTable"

const Equipment = () => {
    const {router} = useRouter();
    const {authUser} = useAuth();
    const {data, mutate} = useSWR(authUser ? ['/api/equipments', authUser.token] : null, fetcher);
    const isAdmin = authUser?.accountType !== 'operator';
    if (!authUser) {
        router?.push("/login/email");
    }


    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Equipements"}>
                        {isAdmin && (
                            <AddEquipmentModal mutate={mutate}>
                                Ajouter
                            </AddEquipmentModal>
                        )}
                    </ContentHeader>
                    <EquipmentsSkeleton/>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.equipments?.length) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Equipements"}>
                        {isAdmin && (
                            <AddEquipmentModal mutate={mutate}>
                                Ajouter
                            </AddEquipmentModal>
                        )}
                    </ContentHeader>
                    <EquipmentTable equipments={data.equipments}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Equipements"}>
                    {isAdmin && (
                        <AddEquipmentModal mutate={mutate}>
                            Ajouter
                        </AddEquipmentModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddEquipmentModal mutate={mutate}>Ajoutez un équipement</AddEquipmentModal>}
                    helpText={"Aucun équipement trouvé."}
                    subHelpText={"Commençons."}
                />
            </Container>
        </DashboardShell>
    );
};

const EquipmentPage = () => (
    <Page name="Equipment" path="/equipments">
        <Equipment/>
    </Page>
);

export default EquipmentPage;
