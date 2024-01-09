import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected=({user})=>{


    return !user ? <Navigate to="/"/> :<Outlet/>
}
export default Protected;