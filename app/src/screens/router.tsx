import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login";
import Register from "./register";
import LoggedArea from "./loggedArea";
import Error from "./error";
import Header from "./components/header";
import UserContextProvider from "../context/user.context";

import { useUserContext } from "../hooks/useContext";

const PrivateRoute = ({children}: any) => {
    const { user } = useUserContext()
    
    if(!user){
        return <Navigate to="/" replace />
    }

    return(
        children
    )
}

const NotPrivateRoute = ({children}: any) => {
    const { user } = useUserContext()
    
    if(user){
        return <Navigate to="/logged" replace />
    }

    return(
        children
    )
}

const Router = () => {
    return(
        <BrowserRouter>
            <UserContextProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<NotPrivateRoute><Login /></NotPrivateRoute>} />
                    <Route path="/login" element={<NotPrivateRoute><Login /></NotPrivateRoute>} />
                    <Route path="/register" element={<NotPrivateRoute><Register /></NotPrivateRoute>} />
                    <Route path="/logged" element={<PrivateRoute><LoggedArea /></PrivateRoute>} />                
                    <Route path="*" element={<Error />} />
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    )
}

export default Router