import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../authSlice"
import { Navigate } from "react-router-dom";


function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInUser);
    if(!user){
        return <Navigate to="auth/login" replace={true}></Navigate>
    }
    if(user && user.role!=="admin"){
        return <Navigate to="/admin/" replace={true}></Navigate>
    }
    console.log(user.role)
     

    return children;
    
}

export default ProtectedAdmin