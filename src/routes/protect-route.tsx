import PageLoading from '@/components/shared/page-loading';
import { useAuth } from '@/hooks/use-auth-context';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectRoute() {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) return <PageLoading />;

    if (!isAuth) return <Navigate to="/sign-in" replace />;

    return <Outlet />;
}
