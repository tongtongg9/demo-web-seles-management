import { salesSchema, TFormSales } from '../form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/shared/spinner';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn, disabledDate } from '@/lib/utils';
import { formatDate } from '@/lib/dayjs';
import { useNavigate } from 'react-router-dom';

type FormSalesProps = {
    type: 'add' | 'edit';
    isLoading?: boolean;
    defaultValues?: TFormSales;
    onSubmit: (values: TFormSales) => void;
};

export default function FormSales({ onSubmit, isLoading, defaultValues, type }: FormSalesProps) {
    const navigate = useNavigate();
    
    const form = useForm<TFormSales>({
        resolver: zodResolver(salesSchema),
        defaultValues,
    });

    function onReset() {
        form.reset();
    }

    function onCancel() {
        navigate(-1);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="customer_name"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Customer Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="product"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Product" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sales_amount"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Sales Amount"
                                        min={0}
                                        step={0.01}
                                        onChange={(e) => {
                                            const value = parseFloat(e.target.value);
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="date"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormControl>
                                <Input type="datetime-local" placeholder="Date" {...field} />
                            </FormControl> */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full pl-3 text-left font-normal',
                                                !field.value && 'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                formatDate(field.value, 'MMM DD, YYYY')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 w-auto" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={new Date(field.value)}
                                        onSelect={field.onChange}
                                        disabled={disabledDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="region"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Region" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2 mt-2">
                    {type === 'edit' && (
                        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="button" variant="secondary" onClick={onReset} disabled={isLoading}>
                        Reset
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Spinner className="mr-2" />}
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}
