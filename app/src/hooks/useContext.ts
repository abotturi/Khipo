import React, { useContext } from "react";
import { UserContext } from "../context/user.context";

export const useUserContext = () => {
    const {user, login, logout}: any = useContext(UserContext)

    return {user, login, logout}
}