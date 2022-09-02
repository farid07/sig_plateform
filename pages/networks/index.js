import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import dynamic from 'next/dynamic';
// import NetworkHeader from "@/components/networks/NetworkHeader";

const DynamicComponentWithNoSSR = dynamic(() => import('/components/Map'), {
    ssr: false
});


const Network = () => {
    const {authUser} = useAuth();
    const {router} = useRouter();
    const data = {};

    if (!authUser) {
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
                {/*<NetworkHeader title={"Réseaux"}/>*/}
                <DynamicComponentWithNoSSR showAll={false}/>
            </Container>
        </DashboardShell>
    );
};

const NetworkPage = () => (
    <Page name="Network" path="/pages/networks/index">
        <Network/>
    </Page>
);

export default NetworkPage;