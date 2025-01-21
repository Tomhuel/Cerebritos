import { Roles } from "../../utils/roles";
import DefaultMiddleware from "./Middleware";

export default function AuthenticatedMiddleware({children}) {

    return <DefaultMiddleware roles={[Roles.admin, Roles.father, Roles.kid, Roles.monitor]}>
        {children}
    </DefaultMiddleware>
}