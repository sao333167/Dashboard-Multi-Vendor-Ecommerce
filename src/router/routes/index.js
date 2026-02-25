import MainLayout from "../../layout/MainLayout";
import { privateRoutes } from "./privateRoutes";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {

    // we only mutate the route objects, no need to return a new array
    privateRoutes.forEach(r => {
        r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>
    });
    
    return {
        path:'/',
        element: <MainLayout/>,
        children: privateRoutes
    };
} 