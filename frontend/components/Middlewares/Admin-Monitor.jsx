import { Roles } from "../../utils/roles";
import DefaultMiddleware from "./Middleware";

export default function AdminMonitorMiddleware({children}) {

    return <DefaultMiddleware roles={[Roles.admin, Roles.monitor]}>
        {children}
    </DefaultMiddleware>
}