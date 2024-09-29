import { TRole } from '@/types';
import { Badge } from '@/components/ui/badge';

type RoleBadgeProps = {
    role: TRole;
    type?: 'text' | 'outline';
};

const badgeText = { admin: 'Admin', sales_analyst: 'Sales Analyst' };

export default function RoleBadge({ role, type = 'outline' }: RoleBadgeProps) {
    if (type === 'text') return badgeText[role];

    return (
        <Badge variant="outline" className="whitespace-nowrap">
            {badgeText[role]}
        </Badge>
    );
}
