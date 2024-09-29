import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { AuthProvider } from '@/providers/auth-provider';
import { ModalProvider } from '@/providers/modal-provider';
import '@/data/random-sales-data'

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ModalProvider>
        </QueryClientProvider>
    );
}
