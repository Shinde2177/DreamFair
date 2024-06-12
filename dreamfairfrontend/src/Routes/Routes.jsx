import { Route, Routes } from "react-router-dom"
import UserForm from "../Users/adduser"

const Routers=()=>{
    return(
        <div>
            <Routes>
                <Route path="/signup" element={<UserForm/>}/>
            </Routes>
        </div>
    )
}

export default Routers;