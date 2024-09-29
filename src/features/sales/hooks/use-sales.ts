import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import salesService from '@/services/sales.service';
import { useAuth } from '@/hooks/use-auth-context';
import { TSales } from '@/types';

export const useGetSales = () => {
    const { user, isLoading } = useAuth();

    return useQuery({
        queryKey: ['sales'],
        queryFn: user?.role === 'admin' ? salesService.getSales : () => salesService.getSalesOfSalesAnalyst(user!.id),
        enabled: !isLoading,
    });
};

export const useGetSalesById = (salesId: string) => {
    if (!salesId) {
        throw new Error('Sales ID is required');
    }

    return useQuery({
        queryKey: ['sales', salesId],
        queryFn: () => salesService.getSalesById(salesId),
        enabled: !!salesId,
    });
};

export const useAddSales = () => {
    const navigate = useNavigate();

    const { user } = useAuth();

    return useMutation({
        mutationKey: ['add-sales'],
        mutationFn: (payload: Partial<TSales>) => salesService.addSales(payload, user!.id),
        onSuccess: () => {
            navigate('/sales');
            queryClient.invalidateQueries({ queryKey: ['sales'] });
            toast.success('Sales added successfully!');
        },
        onError: (error) => {
            toast.error('Failed to add sales!');
            console.error(error);
        },
    });
};

export const useEditSales = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['edit-sales'],
        mutationFn: salesService.editSales,
        onSuccess: () => {
            navigate('/sales');
            queryClient.invalidateQueries({ queryKey: ['sales'] });
            toast.success('Sales updated successfully!');
        },
        onError: (error) => {
            toast.error('Failed to update sales!');
            console.error(error);
        },
    });
};

export const useDeleteSales = () => {
    return useMutation({
        mutationKey: ['delete-sales'],
        mutationFn: salesService.deleteSales,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sales'] });
            toast.success('Sales deleted successfully!');
        },
        onError: (error) => {
            toast.error('Failed to delete sales!');
            console.error(error);
        },
    });
};
