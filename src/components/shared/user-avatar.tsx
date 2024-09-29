import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatInitials } from '@/lib/utils';
import React from 'react';

type UserAvatarProps = {
    fName: string;
    lName: string;
    classNames?: {
        avatar?: React.HTMLAttributes<HTMLDivElement>['className'];
        fallback?: React.HTMLAttributes<HTMLDivElement>['className'];
    };
};

export default function UserAvatar({ fName, lName, classNames }: UserAvatarProps) {
    return (
        <Avatar className={classNames?.avatar}>
            <AvatarFallback className={classNames?.fallback}>{formatInitials(fName, lName)}</AvatarFallback>
        </Avatar>
    );
}
