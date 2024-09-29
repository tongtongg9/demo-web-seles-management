import { useAuth } from '@/hooks/use-auth-context';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
    const { user, isAuth } = useAuth();

    if (isAuth && user?.role !== 'admin') return <Navigate to="/" replace />;

    return <Outlet />;
}
