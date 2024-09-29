import { Spinner } from '@/components/shared/spinner';
import React from 'react';

type FormUserLoadingProps = {
    isLoading?: boolean;
    children: React.ReactNode;
};

export default function FormUserLoading({ isLoading, children }: FormUserLoadingProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="flex items-center space-x-2">
                    <Spinner />
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
