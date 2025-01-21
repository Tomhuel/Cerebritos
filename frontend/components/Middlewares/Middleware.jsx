import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DefaultMiddleware({ roles, children }) {

    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [enable, setEnable] = useState(false);

    useEffect(() => {
        if (status !== 'loading') {
            if (status === 'unauthenticated') {
                router.push('/');
            }
            if (session !== null) {
                if (!roles.includes(session.user.user.role_id)) {
                    router.push('/');
                } else {
                    setEnable(true);
                }
            } else {
                router.push('/');
            }
        }
    }, [status]);

    if (enable) {
        return children;
    }

    return <></>
}