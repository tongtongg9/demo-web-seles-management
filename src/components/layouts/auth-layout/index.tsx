import PageLoading from '@/components/shared/page-loading';
import { useAuth } from '@/hooks/use-auth-context';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) return <PageLoading />;

    if (isAuth) return <Navigate to="/" replace />;

    return (
        <div className="flex flex-col flex-1 bg-zinc-100 min-h-dvh">
            <Outlet />
        </div>
    );
}
