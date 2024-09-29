import { useAuth } from '@/hooks/use-auth-context';
import { BadgeDollarSign, Gauge, UserRoundCog } from 'lucide-react';

const NAVIGATION_ITEMS = [
    {
        key: 'dashboard',
        title: 'Dashboard',
        href: '/',
        icon: Gauge,
    },
    {
        key: 'manage-users',
        title: 'Manage Users',
        href: '/manage-users',
        icon: UserRoundCog,
    },
    {
        key: 'sales',
        title: 'Sales',
        href: '/sales',
        icon: BadgeDollarSign,
    },
];

export const useNavigationItems = () => {
    const { user } = useAuth();

    const items =
        user?.role === 'admin' ? NAVIGATION_ITEMS : NAVIGATION_ITEMS.filter((item) => item.key !== 'manage-users');

    return [items]
};
