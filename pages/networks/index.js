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
    // const [data, setData] = useContext(MapDataContext); carlos
    const data = {}

    const [equipments, setEquipments] = useState([])
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
        setEquipments(d.equipments.filter(e => e.userId === authUser?.uid)); // farid

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


    // if (operators?.operators?.length && data.length) {
    //     return (
    //         <DashboardShell>
    //             {/*   <Container>
    //                 <NetworkHeader title={"Réseaux"} operators={operators.operators} onChange={onChange}/>
    //                 <DynamicComponentWithNoSSR data={data}/>
    //             </Container>
    //             */}
    //             <Container/> {/* farid */}
    //         </DashboardShell>
    //     );
    // }
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
            <Container>
                {/*<NetworkHeader title={"Réseaux"}/> */}
                <DynamicComponentWithNoSSR data={equipments} showAll={false}/>
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