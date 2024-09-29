import RoleBadge from '@/components/shared/role-badge';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { TUser } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChangeUserStatus } from '../hooks/use-manage-user';
import StatusBadge from '@/components/shared/status-badge';
import { useAuth } from '@/hooks/use-auth-context';
import { useCallback } from 'react';
import UserAvatar from '@/components/shared/user-avatar';

export function useColumns() {
    const modal = useModal();
    const { user } = useAuth();
    const { mutateAsync: mutateChangeUserStatus } = useChangeUserStatus();

    const isMe = useCallback((id: string) => user?.id === id, [user]);

    const columns: ColumnDef<TUser>[] = [
        // email
        {
            accessorKey: 'email',
            header: 'Name',
            cell: ({ row }) => {
                const email = `${row.getValue('email')}`;
                const name = `${row.original.first_name} ${row.original.last_name}`;

                return (
                    <div className="flex items-center gap-4">
                        <UserAvatar fName={row.original.first_name} lName={row.original.last_name} />
                        <div className="flex flex-col flex-auto">
                            <Button variant="link" asChild className="p-0 w-fit h-auto">
                                <Link to={`/manage-users/${row.original.id}/detail`}>{email}</Link>
                            </Button>
                            <span className="text-muted-foreground">{name}</span>
                        </div>
                    </div>
                );
            },
        },
        // phone number
        {
            accessorKey: 'phone_number',
            header: 'Phone Number',
            cell: ({ row }) => row.getValue('phone_number'),
        },
        // role
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => <RoleBadge role={row.original.role} />,
        },
        // status
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => <StatusBadge status={row.original.status} />,
        },

        // actions
        {
            accessorKey: 'actions',
            header: 'Actions',

            cell: ({ row }) => {
                if (isMe(row.original.id)) return '-';

                return (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild title="View User">
                            <Link to={`/manage-users/${row.original.id}/detail`}>
                                <Eye className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild title="Edit User">
                            <Link to={`/manage-users/${row.original.id}/edit`}>
                                <Pencil className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            title="Delete User"
                            onClick={() => {
                                modal.confirm({
                                    title: 'Delete User',
                                    content: 'Are you sure you want to delete this user?',
                                    onOk: () => mutateChangeUserStatus({ id: row.original.id, status: 'suspended' }),
                                });
                            }}
                        >
                            <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return [columns];
}
