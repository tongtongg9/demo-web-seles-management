import { useMutation, useQuery } from '@tanstack/react-query';
import usersService from '@/services/users.service';
import { queryClient } from '@/lib/query-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: usersService.getUsers,
        select: (data) => data.filter((user) => user.status !== 'suspended'),
    });
};

export const useGetUser = (userId: string) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => usersService.getUser(userId),
        enabled: !!userId,
    });
};

export const useAddUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['add-user'],
        mutationFn: usersService.addUser,
        onSuccess: () => {
            navigate('/manage-users');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User added successfully!');
        },
        onError: (error) => {
            toast.error('Failed to add user!');
            console.error(error);
        },
    });
};

export const useEditUser = () => {
    return useMutation({
        mutationKey: ['edit-user'],
        mutationFn: usersService.editUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('User updated successfully!');
        },
        onError: (error) => {
            toast.error('Failed to update user!');
            console.error(error);
        },
    });
};

export const useDeleteUser = () => {
    return useMutation({
        mutationKey: ['delete-user'],
        mutationFn: usersService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User deleted successfully!');
        },
        onError: (error) => {
            toast.error('Failed to delete user!');
            console.error(error);
        },
    });
};

export const useChangeUserStatus = () => {
    return useMutation({
        mutationKey: ['change-user-status'],
        mutationFn: usersService.changeUserStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User status changed successfully!');
        },
        onError: (error) => {
            toast.error('Failed to change user status!');
            console.error(error);
        },
    });
};
