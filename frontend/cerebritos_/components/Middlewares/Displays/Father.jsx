import { Roles } from "../../../utils/roles";
import DefaultDisplay from "./DefaultDisplay";

export default function FatherDisplay({ children }) {

    return <DefaultDisplay roles={[Roles.admin, Roles.father, Roles.monitor]}>
        {children}
    </DefaultDisplay>
}