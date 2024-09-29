import PageTitle from '@/components/shared/page-title';
import { Card, CardContent } from '@/components/ui/card';
import FormUser from '@/features/user-management/components/form-user';
import { useAddUser } from '@/features/user-management/hooks/use-manage-user';

export default function AddUserPage() {
    const { mutateAsync: mutateAddUser, isPending } = useAddUser();

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle title="Add User" />

            <Card className="max-w-screen-md overflow-x-hidden container">
                <CardContent className="p-6">
                    <FormUser
                        type="add"
                        isLoading={isPending}
                        onSubmit={(values) => {
                            mutateAddUser(values);
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
