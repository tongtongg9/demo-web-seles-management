import PageLoading from '@/components/shared/page-loading';
import PageTitle from '@/components/shared/page-title';
import UserAvatar from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CardUserInfo from '@/features/user-management/components/card-user-info';
import { useGetUser } from '@/features/user-management/hooks/use-manage-user';
import { Pencil } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function DetailUserPage() {
    const { userId } = useParams();
    const { data: user, isLoading } = useGetUser(userId!);

    const fullName = user?.first_name || user?.last_name ? `${user?.first_name} ${user?.last_name}` : 'Profile';

    if (isLoading) {
        return <PageLoading />;
    }

    return (
        <div className="gap-6 grid px-4 md:px-0 max-w-screen-lg container">
            <Card>
                <CardContent className="p-6">
                    <PageTitle
                        title={
                            <div className="flex items-center gap-6">
                                <UserAvatar
                                    fName={user?.first_name || ''}
                                    lName={user?.last_name || ''}
                                    classNames={{ avatar: 'w-20 h-20', fallback: 'text-2xl' }}
                                />
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-2xl text-primary">{fullName}</h3>
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                        }
                        actions={[
                            <Button size="icon" variant="ghost" asChild>
                                <Link to={`/manage-users/${user?.id}/edit`}>
                                    <Pencil className="w-4 h-4" />
                                </Link>
                            </Button>,
                        ]}
                    />
                </CardContent>
            </Card>

            <CardUserInfo user={user!} />
        </div>
    );
}
