import useSWR from 'swr';
import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React, {useEffect, useState} from "react";
import EmptyState from "@/components/EmptyState";
import AddEquipmentModal from "@/components/equipment/AddEquipmentModal";
import ContentHeader from "@/components/ContentHeader";
import EquipmentsSkeleton from "@/components/equipment/EquipmentsSkeleton";
import EquipmentTable from "@/components/equipment/EquipmentTable";

const Equipment = () => {
    const {router} = useRouter();
    const {authUser, getOperator} = useAuth();
    const [operator, setOperator] = useState({});
    const isOperator = authUser?.accountType === 'operator';
    const {
        data,
        mutate
    } = useSWR(authUser ? [isOperator ? `/api/equipments/user/${authUser?.uid}` : "/api/equipments/", authUser.token] : null, fetcher);
    if (!authUser) {
        router?.push("/login/email");
    }

    useEffect(async () => {
        if (authUser) {
            const data = await getOperator()
            setOperator(data.operator[0])
        }
    }, [])

    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Equipements"}>
                        {isOperator && (
                            <AddEquipmentModal operator={operator} mutate={mutate}>
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
                        {isOperator && (
                            <AddEquipmentModal operator={operator} mutate={mutate}>
                                Ajouter
                            </AddEquipmentModal>
                        )}
                    </ContentHeader>
                    <EquipmentTable operator={operator} equipments={data.equipments} mutate={mutate}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Equipements"}>
                    {isOperator && (
                        <AddEquipmentModal operator={operator} mutate={mutate}>
                            Ajouter
                        </AddEquipmentModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddEquipmentModal operator={operator} mutate={mutate}>Ajoutez un
                        équipement</AddEquipmentModal>}
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


