import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OwnDisplay({ id, children }) {

    const { data: session, status, update } = useSession();
    const [enable, setEnable] = useState(false);

    useEffect(() => {
        if (status !== 'loading') {
            if (status === 'authenticated' && id === `${session?.user.user.id}`) {
                setEnable(true);
            }
        }

    }, [status]);

    if (enable) {
        return children;
    }

    return <></>
}