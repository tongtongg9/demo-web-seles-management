import PageLoading from '@/components/shared/page-loading';
import PageTitle from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RecentSales from '@/features/dashboard/recent-sales';
import RegionChart from '@/features/dashboard/region-chart';
import Stat from '@/features/dashboard/stat';
import { useGetSales } from '@/features/sales/hooks/use-sales';
import { Suspense } from 'react';

export default function DashboardPage() {
    const { data: sales, isLoading } = useGetSales();

    if (isLoading) return <PageLoading />;

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle title="Dashboard" subtitle="Welcome to your dashboard" />

            <Suspense fallback={<Spinner />}>
                <Stat salesData={sales || []} />
            </Suspense>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RecentSales salesData={sales || []} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sales by Region</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Suspense fallback={<Spinner />}>
                            <RegionChart salesData={sales || []} />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
