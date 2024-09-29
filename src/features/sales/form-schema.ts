import { z } from 'zod';

export const salesSchema = z.object({
    customer_name: z.string().min(1, { message: 'Customer Name is required' }),
    product: z.string().min(1, { message: 'Product is required' }),
    sales_amount: z.number().min(1, { message: 'Sales Amount is required' }),
    date: z
        .date()
        .refine((val) => val.toString() !== 'Invalid Date', { message: 'Date is required' })
        .or(z.string().min(1, { message: 'Date is required' })),
    region: z.string().min(1, { message: 'Region is required' }),
});

export type TFormSales = z.infer<typeof salesSchema>;
