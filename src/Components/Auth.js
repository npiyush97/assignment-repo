import { Navigate, Outlet } from "react-router-dom"

function AuthRoute() {
    let auth = 'a'
    if (!auth) {
        return <Navigate to='/register' />
    }
    return <Outlet />
}

export default AuthRoute