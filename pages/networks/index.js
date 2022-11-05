import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import dynamic from 'next/dynamic';
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import {useContext, useEffect, useState} from "react";
import NetworkHeader from "@/components/networks/NetworkHeader";
import {Flex} from "@chakra-ui/react";
import {MapDataContext} from "@/components/MapDataContext";
// import MapBack from "@/components/MapBack";
const DynamicComponentWithNoSSR = dynamic(() => import('/components/Map'), {
    ssr: false
});


const Network = () => {
    const {authUser} = useAuth();
    const {router} = useRouter();
    const token = authUser?.token
    const [data, setData] = useContext(MapDataContext);

    const [equipments, setEquipments] = useState(data)
    const [operators, setOperators] = useState([])
    const [uid, setUid] = useState(null)

    function onChange(e) {
        setUid(e.target?.value)
        let filtered = uid ? data.filter(e => e.userId === uid) : data.filter(e => e.userId === authUser?.uid)
        setData(filtered)
        console.log(data)
    }

    useEffect(async () => {
        const res = await fetch('/api/operators/', {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json', token}),
            credentials: 'same-origin'
        });
        setOperators(await res.json())

        //recuperation de la liste des equipements
        const t = await fetch("/api/equipments", {
            method: 'GET',
            headers: new Headers({"Content-Type": 'application/json', token}),
            credentials: 'same-origin'
        });

        const d = await t.json()
        setData(d.equipments);

    }, [])

    if (!authUser) {
        router?.push("/login/email");
    }

    if (!operators) {
        return (
            <DashboardShell>
                <Container/>
            </DashboardShell>
        );
    }

    if (operators?.operators?.length && data.length) {
        return (
            <DashboardShell>
                <Container>
                    <NetworkHeader title={"Réseaux"} operators={operators.operators} onChange={onChange}/>
                    <DynamicComponentWithNoSSR data={data}/>
                </Container>
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <Container/>
        </DashboardShell>
    );
};

const NetworkPage = () => (
    <Page name="Network" path="/pages/networks/index">
        <Network/>
    </Page>
);

export default NetworkPage;