import authService from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSignIn = () => {
    return useMutation({
        mutationKey: ['sign-in'],
        mutationFn: authService.signIn,
        onSuccess: (data) => {
            location.href = '/';
            localStorage.setItem(
                '_auth',
                JSON.stringify({
                    id: data.id,
                    email: data.email,
                    role: data.role,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone_number: data.phone_number,
                })
            );
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message || 'Failed to sign in', {
                duration: 5000,
                position: 'top-center',
            });
        },
    });
};
