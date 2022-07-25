import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React, {useEffect} from "react";
import ShowNetwork from "@/components/networks/ShowNetwork";
import EmptyState from "@/components/EmptyState";
import AddNetworkModal from "@/components/networks/AddNetworkModal";
import ContentHeader from "@/components/ContentHeader";
import NetworksSkeleton from "@/components/networks/NetworksSkeleton";

const NetworkDetail = () => {
    const router = useRouter()
    const network_id = router?.query?.id
    const {authUser} = useAuth();
    const {data} = useSWR(authUser && network_id ? [`/api/networks/${network_id}`, authUser?.token] : null, fetcher);
    const isAdmin = authUser?.accountType !== 'operateur';

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
                    <ContentHeader title={"Détails Réseaux"}>
                        {isAdmin && (
                            <AddNetworkModal>
                                Mettre à jour
                            </AddNetworkModal>
                        )}
                    </ContentHeader>
                    <NetworksSkeleton/>
                </Container>
            </DashboardShell>
        );
    }

    if (data?.network) {
        return (
            <DashboardShell>
                <Container>
                    <ContentHeader title={"Détails Réseaux"}>
                        {isAdmin && (
                            <AddNetworkModal>
                                Mettre à jour
                            </AddNetworkModal>
                        )}
                    </ContentHeader>
                    <ShowNetwork network={data.network}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <ContentHeader title={"Détails Réseaux"}>
                    {isAdmin && (
                        <AddNetworkModal>
                            Mettre à jour
                        </AddNetworkModal>
                    )}
                </ContentHeader>
                <EmptyState
                    button={<AddNetworkModal>Mettre à jour</AddNetworkModal>}
                    helpText={"Aucune information à afficher."}
                />
            </Container>
        </DashboardShell>
    );
};

const NetworkDetailPage = () => (
    <Page name="NetworkDetail" path="/networks/[id]">
        <NetworkDetail/>
    </Page>
);

export default NetworkDetailPage;
