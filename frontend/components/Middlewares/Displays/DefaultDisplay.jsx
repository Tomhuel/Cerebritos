import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DefaultDisplay({ roles, children }) {

    const { data: session, status, update } = useSession();
    const [enable, setEnable] = useState(false);

    useEffect(() => {

        if (status !== 'loading') {
            if (status !== 'unauthenticated' && session !== null && roles.includes(session.user.user.role_id)) {
                setEnable(true);
            }
        }

    }, [status]);

    if (enable) {
        return children;
    }

    return <></>
}