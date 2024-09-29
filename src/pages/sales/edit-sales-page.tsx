import PageTitle from '@/components/shared/page-title';
import { Card, CardContent } from '@/components/ui/card';
import FormSales from '@/features/sales/components/form-sales';
import FormSalesLoading from '@/features/sales/components/form-sales-loading';
import { useEditSales, useGetSalesById } from '@/features/sales/hooks/use-sales';
import { useParams } from 'react-router-dom';

export default function EditSalesPage() {
    const { salesId } = useParams();
    const { data: sales, isLoading } = useGetSalesById(salesId!);
    const { mutate: mutateEditSales, isPending: isEditLoading } = useEditSales();

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle title="Edit Sales Data" />

            <Card className="max-w-screen-md overflow-x-hidden container">
                <CardContent className="p-6">
                    <FormSalesLoading isLoading={isLoading}>
                        <FormSales
                            type="edit"
                            isLoading={isEditLoading}
                            defaultValues={sales}
                            onSubmit={(values) => {
                                mutateEditSales({
                                    ...values,
                                    id: salesId!,
                                    date: values.date.toString()
                                });
                            }}
                        />
                    </FormSalesLoading>
                </CardContent>
            </Card>
        </div>
    );
}
