import { Loader, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface SpinnerProps extends LucideProps {
    className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export function Spinner({ className, ...props }: SpinnerProps) {
    return <Loader className={cn('w-4 h-4 animate-spin', className)} {...props} />;
}
