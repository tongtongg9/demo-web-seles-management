import { TUser } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
    status: TUser['status'];
    className?: React.HTMLAttributes<HTMLSpanElement>['className'];
};

const badgeText = { active: 'Active', suspended: 'Suspended' };

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <Badge variant={status === 'active' ? 'default' : 'destructive'} className={cn('whitespace-nowrap', className)}>
            {badgeText[status]}
        </Badge>
    );
}

// type RoleBadgeProps = {
//     role: TRole;
// };

// const badgeText = { admin: 'Admin', sales_analyst: 'Sales Analyst' };

// export default function RoleBadge({ role }: RoleBadgeProps) {
//     return (
//         <Badge variant="secondary" className="whitespace-nowrap">
//             {badgeText[role]}
//         </Badge>
//     );
// }
