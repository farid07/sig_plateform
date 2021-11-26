import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
// import DashboardShell from '@/layouts/DashboardShell';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";

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
            <Container/>
        </DashboardShell>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/dashboard">
        <Dashboard />
    </Page>
);

export default DashboardPage;
