import { Roles } from "../../utils/roles";
import DefaultMiddleware from "./Middleware";

export default function KidMiddleware({ children }) {

    return <DefaultMiddleware roles={[Roles.admin, Roles.kid, Roles.monitor]}>
        {children}
    </DefaultMiddleware>
}