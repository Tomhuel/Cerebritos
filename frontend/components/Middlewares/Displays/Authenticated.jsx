import { Roles } from "../../../utils/roles";
import DefaultDisplay from "./DefaultDisplay";

export default function AuthenticatedDisplay({ children }) {

    return <DefaultDisplay roles={[Roles.admin, Roles.father, Roles.kid, Roles.monitor]}>
        {children}
    </DefaultDisplay>
}