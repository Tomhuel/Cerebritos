import { Roles } from "../../../utils/roles";
import DefaultDisplay from "./DefaultDisplay";

export default function AdminMonitorDisplay({ children }) {

    return <DefaultDisplay roles={[Roles.admin, Roles.monitor]}>
        {children}
    </DefaultDisplay>
}