import {useRouter} from "next/router";
import {useAuth} from "@/lib/auth";
import {useEffect} from "react";

const LoggedIn = () => {
    const { authUser, loading } = useAuth();
    const router = useRouter();

    // Listen for changes on loading and authUser, redirect if needed
    useEffect(() => {
        if (!loading && !authUser)
            router.push('/')
    }, [authUser, loading])

    return (
        <div>
            hello
        </div>
    )
}

export default LoggedIn;