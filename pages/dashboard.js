import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
// import DashboardShell from '@/layouts/DashboardShell';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell2 from "@/layouts/DashboardShell2";

const Dashboard = () => {
    const { authUser } = useAuth();
    const { router } = useRouter();
    const data = {}
    // const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
    // const isPaidAccount = user?.stripeRole !== 'free';
    if(!authUser){
        router?.push("/login/email");
    }

    if (!data) {
        return (
            <DashboardShell2>
                <Container/>
            </DashboardShell2>
        );
    }

    if (data?.sites?.length) {
        return (
            <DashboardShell2>
                <Container/>
            </DashboardShell2>
        );
    }

    return (
        <DashboardShell2>
            <Container/>
        </DashboardShell2>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/dashboard">
        <Dashboard />
    </Page>
);

export default DashboardPage;