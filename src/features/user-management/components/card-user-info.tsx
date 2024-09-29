import RoleBadge from '@/components/shared/role-badge';
import StatusBadge from '@/components/shared/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TUser } from '@/types';

type CardUserInfoProps = {
    user: TUser;
};

export default function CardUserInfo({ user }: CardUserInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <p className="text-muted-foreground text-sm">First Name</p>
                            <p>{user?.first_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Last Name</p>
                            <p>{user?.last_name}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Phone Number</p>
                            <p>{user?.phone_number}</p>
                        </div>
                    </div>

                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <p className="text-muted-foreground text-sm">Role</p>
                            <RoleBadge role={user!.role} />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">Status</p>
                            <StatusBadge status={user!.status} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
