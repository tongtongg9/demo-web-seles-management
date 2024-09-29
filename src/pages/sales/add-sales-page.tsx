import PageTitle from '@/components/shared/page-title';
import { Card, CardContent } from '@/components/ui/card';
import FormSales from '@/features/sales/components/form-sales';
import { useAddSales } from '@/features/sales/hooks/use-sales';

export default function AddSalesPage() {
    const { mutate: mutateAddSales, isPending } = useAddSales();

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle title="Add Sales Data" />

            <Card className="max-w-screen-md overflow-x-hidden container">
                <CardContent className="p-6">
                    <FormSales
                        type="add"
                        isLoading={isPending}
                        onSubmit={(values) => {
                            mutateAddSales({
                                ...values,
                                date: values.date.toString(),
                            });
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
