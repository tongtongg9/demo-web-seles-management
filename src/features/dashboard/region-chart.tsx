import { memo, useMemo } from 'react';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { TSales } from '@/types';

type RegionChartProps = {
    // chartData: Array<{ region: string; amount: number }>;
    salesData: TSales[];
};

const chartConfig = {
    region: {
        label: 'Region',
        color: 'var(--color-text-muted)',
    },
} satisfies ChartConfig;

const RegionChart = memo(({ salesData }: RegionChartProps) => {
    const salesByRegion = useMemo(() => {
        return salesData?.reduce((acc, sale) => {
            acc[sale.region] = (acc[sale.region] || 0) + sale.sales_amount;
            return acc;
        }, {} as Record<string, number>);
    }, [salesData]);

    const chartData = useMemo(() => {
        return Object.entries(salesByRegion || {}).map(([region, amount]) => ({
            region,
            amount,
        }));
    }, [salesByRegion]);

    return (
        <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="region"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
});

export default RegionChart;
