import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import {useRouter} from "next/router";

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
                <SiteTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    if (data?.sites?.length) {
        return (
            <DashboardShell>
                <SiteTableHeader isPaidAccount={false} />
                <SiteTable sites={data.sites} />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <SiteTableHeader isPaidAccount={false} />
        </DashboardShell>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/sites">
        <Dashboard />
    </Page>
);

export default DashboardPage;