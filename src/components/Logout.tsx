import { useEffect } from "react";
import { clearToken } from "../tools/AuthTools";

const Logout = () => {
    useEffect(() => {
        clearToken();
    });
    return (<div></div>);
}

export default Logout;