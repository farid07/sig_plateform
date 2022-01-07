import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
// import DashboardShell from '@/layouts/DashboardShell';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import dynamic from 'next/dynamic';


const DynamicComponentWithNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false
});


const Dashboard = () => {
    const { authUser } = useAuth();
    const { router } = useRouter();
    const data = {}


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
            <Container>
              <DynamicComponentWithNoSSR />
            </Container>
        </DashboardShell>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/dashboard">
        <Dashboard />
    </Page>
);

export default DashboardPage;
