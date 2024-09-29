import { Spinner } from "@/components/shared/spinner";

type FormSalesLoadingProps = {
    isLoading?: boolean;
    children: React.ReactNode;
};

export default function FormSalesLoading({ children, isLoading }: FormSalesLoadingProps) {
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
