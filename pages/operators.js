import useSWR from 'swr';

import {useAuth} from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import React from "react";
import ShowOperators from "@/components/ShowOperators";

const Operator = () => {
    const {router} = useRouter();
    const {authUser} = useAuth();
    const {data} = useSWR(authUser ? ['/api/operators', authUser.token] : null, fetcher);
    const isAdmin = authUser?.accountType !== 'operator';
    if (!authUser) {
        router?.push("/login/email");
    }

    console.log(data)

    if (!data) {
        return (
            <DashboardShell>
                <Container>
                    Chargement
                </Container>
            </DashboardShell>
        );
    }

    if (data?.operators?.length) {
        return (
            <DashboardShell>
                <Container>
                    <ShowOperators operators={data.operators}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container>
                Aucun operateur disponible
            </Container>
        </DashboardShell>
    );
};

const OperatorPage = () => (
    <Page name="Operator" path="/operator">
        <Operator/>
    </Page>
);

export default OperatorPage;
