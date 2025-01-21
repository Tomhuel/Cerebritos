import { Roles } from "../../utils/roles";
import DefaultMiddleware from "./Middleware";

export default function FatherMiddleware({children}) {

    return <DefaultMiddleware roles={[Roles.admin, Roles.father, Roles.monitor]}>
        {children}
    </DefaultMiddleware>
}