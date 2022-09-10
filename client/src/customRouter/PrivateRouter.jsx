import { Outlet, Navigate } from 'react-router-dom'

const PrivateRouter = () => {
    const firstLogin = localStorage.getItem('firstLogin')
    return firstLogin ?  <Outlet /> : <Navigate to="/login" replace="true" />
}

export default PrivateRouter