import { Roles } from "../../utils/roles";
import DefaultMiddleware from "./Middleware";

export default function AdminMiddleware({ children }) {

    return <DefaultMiddleware roles={[Roles.admin]}>
        {children}
    </DefaultMiddleware>
}