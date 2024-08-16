import { useEffect } from "react";
import { 
    NavLink, 
    Outlet, 
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit
} from "react-router-dom";


export default function Root() {
    return (
      <>
        
            <Outlet />
      </>
    );
  }