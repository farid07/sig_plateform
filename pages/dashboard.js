import {useAuth} from '@/lib/auth';
import Page from '@/components/Page';
// import DashboardShell from '@/layouts/DashboardShell';
import {useRouter} from "next/router";
import Container from "@/components/Container";
import DashboardShell from "@/layouts/DashboardShell";
import {useEffect, useState} from "react";
import useSWR from "swr";




const Dashboard = () => {
    const { authUser } = useAuth();
    const { router } = useRouter();
    const data = {}
    /*
    // const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
    // const isPaidAccount = user?.stripeRole !== 'free';
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [Map, setMap] = useState();
    const { error } = useSWR("/api/liveMusic", fetcher);

    if (error) {
        console.error(error);
    }

    mapboxgl.accessToken =
        "sk.eyJ1IjoiZW1tYW51ZWxkYWR5MDA3IiwiYSI6ImNreGJ6emg0NjFmYWszMXFjODV5M3p0dzAifQ.KwOs1G0wTFeXW1YC3s-XhQ";

    useEffect(() => {
        setPageIsMounted(true);

        let map = new mapboxgl.Map({
            container: "my-map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-77.02, 38.887],
            zoom: 12.5,
            pitch: 45,
            maxBounds: [
                [-77.875588, 38.50705], // Southwest coordinates
                [-76.15381, 39.548764], // Northeast coordinates
            ],
        });

        initializeMap(mapboxgl, map);
        setMap(map);
    }, []);

    useEffect(() => {
        if (pageIsMounted && data) {
            Map.on("load", function () {
                addDataLayer(Map, data);
            });
        }
    }, [pageIsMounted, setMap, data, Map]);
*/

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
            <Container id={"my-app"}/>
        </DashboardShell>
    );
};

const DashboardPage = () => (
    <Page name="Dashboard" path="/dashboard">
        <Dashboard />
    </Page>
);

export default DashboardPage;
