import { Roles } from "../../../utils/roles";
import DefaultDisplay from "./DefaultDisplay";

export default function AdminDisplay({ children }) {

    return <DefaultDisplay roles={[Roles.admin]}>
        {children}
    </DefaultDisplay>
}