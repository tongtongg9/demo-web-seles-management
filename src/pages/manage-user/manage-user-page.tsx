import PageTitle from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import TableUser from '@/features/user-management/components/table-user';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetUsers } from '@/features/user-management/hooks/use-manage-user';
import { Card, CardContent } from '@/components/ui/card';

export default function ManageUserPage() {
    const { data: users } = useGetUsers();

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle
                title="Manage Users"
                actions={[
                    <Button variant="default" asChild>
                        <Link to="add">
                            <Plus className="mr-2 w-4 h-4" />
                            Add User
                        </Link>
                    </Button>,
                ]}
            />

            <Card className="overflow-x-hidden">
                <CardContent className="p-6">
                    <TableUser dataSource={users || []} />
                </CardContent>
            </Card>
        </div>
    );
}
