import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import dynamic from 'next/dynamic';
import {useEffect, useState} from "react";

const DynamicComponentWithNoSSR = dynamic(() => import('@/components/Map'), {ssr: false});


const Dashboard = () => {
    const {authUser} = useAuth();
    const {router} = useRouter();
    const [equipments, setEquipments] = useState([])
    const data = {}

    useEffect(async () => {
        const data = await fetch("/api/equipments", {
            method: 'GET',
            headers: new Headers({"Content-Type": 'application/json'}),
            credentials: 'same-origin'
        });

        const d = await data.json()
        setEquipments(d?.equipments)
    }, [])

    if (!authUser) {
        router?.push("/login/email"); // Renvoie l'utilisateur sur la page de connexion s'il ne s'est pas encore authentifié
    }

    if (!data) {
        return (
            <DashboardShell>
                <Container/>
            </DashboardShell>
        );
    }

    if (data?.sites?.length) {
        return (
            <DashboardShell>
                <Container/>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                <DynamicComponentWithNoSSR data={equipments}/>
            </Container>
        </DashboardShell>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/dashboard">
        <Dashboard/>
    </Page>
);

export default DashboardPage;
