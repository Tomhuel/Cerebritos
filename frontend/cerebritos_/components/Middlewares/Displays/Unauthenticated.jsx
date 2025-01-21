import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UnauthenticatedDisplay({ children }) {

    const { data: session, status, update } = useSession();
    const [enable, setEnable] = useState(true);

    useEffect(() => {

        if (status !== 'loading') {
            if (status !== 'unauthenticated' && session !== null) {
                setEnable(false);
            }
        }

    }, [status]);

    if (enable) {
        return children;
    }

    return <></>
}