import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props{
   isAuthenticated: boolean;
   children?: ReactElement;
   adminOnly?: boolean;
   isAdmin?: boolean;
   redirect?: string;
}

const ProtectedRoute = ({isAuthenticated, children, adminOnly, isAdmin, redirect}: Props) => {
   if(!isAuthenticated){
      return <Navigate to="/" />
   }
   if(adminOnly && !isAdmin) return <Navigate to="/"/>;

   return children ? children : <Outlet/>;
};

export default ProtectedRoute;