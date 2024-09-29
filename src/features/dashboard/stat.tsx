import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatNumber } from '@/lib/utils';
import { TSales } from '@/types';
import { useMemo } from 'react';

type StatProps = { salesData: TSales[] };

export default function Stat({ salesData }: StatProps) {
    const totalSales = useMemo(() => salesData.reduce((acc, sale) => acc + sale.sales_amount, 0), [salesData]);

    const averageSale = useMemo(() => {
        if (salesData.length === 0) return 0;
        return totalSales / salesData.length || 0;
    }, [totalSales, salesData]);

    const topProduct = useMemo(() => {
        if (salesData.length === 0) return { product: '', sales_amount: 0 };

        return salesData.reduce((max, sale) => (max.sales_amount > sale.sales_amount ? max : sale));
    }, [salesData]);

    return (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{formatNumber(totalSales)}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Average Sale</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{formatNumber(averageSale)}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top Product</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold text-xl">{topProduct.product}</p>
                    <p className="text-muted-foreground text-sm">{formatNumber(topProduct.sales_amount || 0)}</p>
                </CardContent>
            </Card>
        </div>
    );
}
