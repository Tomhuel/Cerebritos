import { Roles } from "../../../utils/roles";
import DefaultDisplay from "./DefaultDisplay";

export default function KidDisplay({ children }) {

    return <DefaultDisplay roles={[Roles.admin, Roles.kid, Roles.monitor]}>
        {children}
    </DefaultDisplay>
}