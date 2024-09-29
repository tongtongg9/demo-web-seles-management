import PageTitle from '@/components/shared/page-title';
import { Card, CardContent } from '@/components/ui/card';
import FormUser from '@/features/user-management/components/form-user';
import FormUserLoading from '@/features/user-management/components/form-user-loading';
import { useEditUser, useGetUser } from '@/features/user-management/hooks/use-manage-user';
import { useParams } from 'react-router-dom';

export default function EditUserPage() {
    const { userId } = useParams();
    const { data: user, isLoading } = useGetUser(userId!);
    const { mutate: mutateEditUser, isPending: isEditLoading } = useEditUser();

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle title="Edit User" />

            <Card className="max-w-screen-md overflow-x-hidden container">
                <CardContent className="p-6">
                    <FormUserLoading isLoading={isLoading}>
                        <FormUser
                            type="edit"
                            isLoading={isEditLoading}
                            defaultValues={user}
                            onSubmit={(values) => {
                                mutateEditUser({
                                    ...values,
                                    id: userId!,
                                });
                            }}
                        />
                    </FormUserLoading>
                </CardContent>
            </Card>
        </div>
    );
}
