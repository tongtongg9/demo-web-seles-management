import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/dayjs';
import { formatNumber } from '@/lib/utils';
import { TSales } from '@/types';
import { useMemo } from 'react';

type RecentSalesProps = {
    salesData: TSales[];
};

export default function RecentSales({ salesData }: RecentSalesProps) {
    const sales = useMemo(() => {
        if (salesData.length === 0) return [];

        return salesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    }, [salesData]);

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id} className="mb-2">
                    <p className="font-semibold">{sale.customer_name}</p>
                    <p className="text-muted-foreground text-sm">
                        {sale.product} - {formatNumber(sale.sales_amount)} -{' '}
                        <Badge variant="secondary">{formatDate(sale.date, 'MMM DD, YYYY')}</Badge>
                    </p>
                </li>
            ))}
        </ul>
    );
}
