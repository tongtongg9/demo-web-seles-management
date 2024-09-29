import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { formatDate } from '@/lib/dayjs';
import { formatNumber } from '@/lib/utils';
import { TSales } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeleteSales } from '../hooks/use-sales';
import UserAvatar from '@/components/shared/user-avatar';
import { useAuth } from '@/hooks/use-auth-context';

export const useColumns = () => {
    const { user } = useAuth();
    const modal = useModal();
    const { mutateAsync: deleteSales } = useDeleteSales();

    const columns: ColumnDef<TSales>[] = [
        // Customer Name
        {
            accessorKey: 'customer_name',
            header: 'Customer Name',
            cell: ({ row }) => row.getValue('customer_name'),
        },
        // Product
        {
            accessorKey: 'product',
            header: 'Product',
            cell: ({ row }) => row.getValue('product'),
        },
        // Sales Amount
        {
            accessorKey: 'sales_amount',
            header: 'Sales Amount',
            cell: ({ row }) => formatNumber(row.getValue('sales_amount') || 0),
        },
        // Date
        {
            accessorKey: 'date',
            header: 'Date',
            cell: ({ row }) => formatDate(row.getValue('date'), 'MMM DD, YYYY'),
        },
        // Region
        {
            accessorKey: 'region',
            header: 'Region / Country',
            cell: ({ row }) => row.getValue('region'),
        },
        // Sales Person
        {
            accessorKey: 'sales',
            header: 'Sales Person',
            cell: ({ row }) => {
                const salesPerson = row.original.sales;
                const salesName = `${salesPerson?.first_name} ${salesPerson?.last_name}`;

                return (
                    <div className="flex items-center gap-2">
                        <UserAvatar fName={salesPerson?.first_name} lName={salesPerson?.last_name} />
                        <div className="flex flex-col flex-auto">
                            <span>{salesPerson?.email}</span>
                            <span className="text-muted-foreground">{salesName}</span>
                        </div>
                    </div>
                );
            },
        },
        // Actions
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const salesId = row.original.id;

                return (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild title="View Sales">
                            <Link to={`/sales/${salesId}/detail`}>
                                <Eye className="w-4 h-4" />
                            </Link>
                        </Button>

                        {user?.role === 'admin' && (
                            <>
                                <Button variant="outline" size="icon" asChild title="Edit Sales">
                                    <Link to={`/sales/${salesId}/edit`}>
                                        <Pencil className="w-4 h-4" />
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Delete User"
                                    onClick={() => {
                                        modal.confirm({
                                            title: 'Delete Sales',
                                            content: 'Are you sure you want to delete this sales record?',
                                            onOk: () => deleteSales(salesId),
                                        });
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    return [columns];
};
