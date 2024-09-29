import RootLayout from '@/components/layouts/root-layout';
import DashboardPage from '@/pages/dashboard-page';
import AddUserPage from '@/pages/manage-user/add-user-page';
import ManageUserPage from '@/pages/manage-user/manage-user-page';
import { createBrowserRouter } from 'react-router-dom';
import ProtectRoute from './protect-route';
import EditUserPage from '@/pages/manage-user/edit-user-page';
import SignInPage from '@/pages/auth/sign-in-page';
import AuthLayout from '@/components/layouts/auth-layout';
import AdminRoute from './admin-route';
import SalesPage from '@/pages/sales/sales-page';
import AddSalesPage from '@/pages/sales/add-sales-page';
import EditSalesPage from '@/pages/sales/edit-sales-page';
import ProfilePage from '@/pages/profile-page';
import DetailUserPage from '@/pages/manage-user/detail-user-page';
import DetailSalesPage from '@/pages/sales/detail-sales-page';

export const router = createBrowserRouter([
    {
        path: 'sign-in',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <SignInPage />,
            },
        ],
    },
    {
        path: '/',
        element: <ProtectRoute />,
        children: [
            {
                path: '/',
                element: <RootLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: 'manage-users',
                        element: <AdminRoute />,
                        children: [
                            {
                                index: true,
                                element: <ManageUserPage />,
                            },
                            {
                                path: 'add',
                                element: <AddUserPage />,
                            },
                            {
                                path: ':userId/detail',
                                element: <DetailUserPage />,
                            },
                            {
                                path: ':userId/edit',
                                element: <EditUserPage />,
                            },
                        ],
                    },
                    {
                        path: 'sales',
                        children: [
                            {
                                index: true,
                                element: <SalesPage />,
                            },
                            {
                                path: 'add',
                                element: <AddSalesPage />,
                            },
                            {
                                path: ':salesId/detail',
                                element: <DetailSalesPage />,
                            },
                            {
                                path: ':salesId/edit',
                                element: <AdminRoute />,
                                children: [
                                    {
                                        index: true,
                                        element: <EditSalesPage />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />,
                    },
                ],
            },
        ],
    },
]);
