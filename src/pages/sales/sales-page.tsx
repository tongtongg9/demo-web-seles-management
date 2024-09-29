import PageTitle from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TableSales from '@/features/sales/components/table-sales';
import { useGetSales } from '@/features/sales/hooks/use-sales';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SalesPage() {
    const { data: sales } = useGetSales();
    
    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle
                title="Sales Data"
                actions={[
                    <Button variant="default" asChild>
                        <Link to="add">
                            <Plus className="mr-2 w-4 h-4" />
                            Add Sales Data
                        </Link>
                    </Button>,
                ]}
            />

            <Card className="overflow-x-hidden">
                <CardContent className="p-6">
                    <TableSales dataSource={sales || []} />
                </CardContent>
            </Card>
        </div>
    );
}
