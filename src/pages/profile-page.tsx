import PageLoading from '@/components/shared/page-loading';
import PageTitle from '@/components/shared/page-title';
import UserAvatar from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CardUserInfo from '@/features/user-management/components/card-user-info';
import FormUser from '@/features/user-management/components/form-user';
import FormUserLoading from '@/features/user-management/components/form-user-loading';
import { useEditUser, useGetUser } from '@/features/user-management/hooks/use-manage-user';
import { useAuth } from '@/hooks/use-auth-context';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
    const [isEditForm, setIsEditForm] = useState(false);
    const { user } = useAuth();

    const { data: profile, isLoading } = useGetUser(user!.id);
    const { mutateAsync: mutateEditUser, isPending: isEditLoading } = useEditUser();

    if (isLoading) {
        return <PageLoading />;
    }

    const fullName =
        profile?.first_name || profile?.last_name ? `${profile?.first_name} ${profile?.last_name}` : 'Profile';

    return (
        <div className="gap-6 grid px-4 md:px-0 max-w-screen-lg container">
            <Card>
                <CardContent className="p-6">
                    <PageTitle
                        title={
                            <div className="flex items-center gap-6">
                                <UserAvatar
                                    fName={profile?.first_name || ''}
                                    lName={profile?.last_name || ''}
                                    classNames={{ avatar: 'w-20 h-20', fallback: 'text-2xl' }}
                                />
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-2xl text-primary">{fullName}</h3>
                                    <p>{profile?.email}</p>
                                </div>
                            </div>
                        }
                        actions={[
                            <Button
                                onClick={() => setIsEditForm((prev) => !prev)}
                                size="icon"
                                variant={isEditForm ? 'secondary' : 'ghost'}
                            >
                                <Pencil className="w-4 h-4" />
                            </Button>,
                        ]}
                    />
                </CardContent>
            </Card>

            {isEditForm ? (
                <Card>
                    <CardContent className="p-6">
                        <FormUserLoading isLoading={isLoading}>
                            <FormUser
                                type="edit"
                                isLoading={isEditLoading}
                                defaultValues={profile}
                                onSubmit={(values) => {
                                    mutateEditUser(
                                        { ...values, id: user!.id },
                                        { onSuccess: () => setIsEditForm(false) }
                                    );
                                }}
                                onCancel={() => {
                                    setIsEditForm(false);
                                }}
                            />
                        </FormUserLoading>
                    </CardContent>
                </Card>
            ) : (
                <CardUserInfo user={profile!} />
            )}
        </div>
    );
}
