import PageLoading from '@/components/shared/page-loading';
import PageTitle from '@/components/shared/page-title';
import RoleBadge from '@/components/shared/role-badge';
import UserAvatar from '@/components/shared/user-avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetSalesById } from '@/features/sales/hooks/use-sales';
import { formatDate } from '@/lib/dayjs';
import { formatNumber } from '@/lib/utils';
import { useParams } from 'react-router-dom';

export default function DetailSalesPage() {
    const { salesId } = useParams();
    const { data: saleData, isLoading } = useGetSalesById(salesId!);

    if (isLoading) return <PageLoading />;

    return (
        <div className="gap-6 grid px-4 md:px-0 container">
            <PageTitle title="Detail Sales Data" />

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Sale Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="gap-2 grid grid-cols-2">
                            <dt className="font-semibold">Date:</dt>
                            <dd>{formatDate(saleData?.date || '')}</dd>
                            <dt className="font-semibold">Region:</dt>
                            <dd>
                                <Badge variant="outline">{saleData?.region}</Badge>
                            </dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="gap-2 grid grid-cols-2">
                            <dt className="font-semibold">Name:</dt>
                            <dd>{saleData?.customer_name}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="gap-2 grid grid-cols-2">
                            <dt className="font-semibold">Product:</dt>
                            <dd>{saleData?.product}</dd>
                            <dt className="font-semibold">Amount:</dt>
                            <dd>{formatNumber(saleData?.sales_amount || 0)}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sales Person</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <UserAvatar
                                fName={saleData?.sales.first_name || ''}
                                lName={saleData?.sales.last_name || ''}
                            />
                            <div>
                                <p className="font-semibold">
                                    {saleData?.sales.first_name} {saleData?.sales.last_name}
                                </p>
                                <p className="text-muted-foreground text-sm"><RoleBadge role={saleData!.sales!.role} type="text" /></p>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <dl className="gap-2 grid grid-cols-2">
                            <dt className="font-semibold">Email:</dt>
                            <dd>{saleData?.sales?.email || '-'}</dd>
                            <dt className="font-semibold">Phone:</dt>
                            <dd>{saleData?.sales?.phone_number || '-'}</dd>
                        </dl>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
