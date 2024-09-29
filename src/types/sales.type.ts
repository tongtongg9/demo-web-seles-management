import { TUser } from './user.type';

export type TSales = {
    id: string;
    customer_name: string;
    product: string;
    sales_amount: number;
    date: string;
    region: string;
    sales: TSalesPerson;
    created_at: string;
    updated_at: string;
};

export type TSalesPerson = Omit<TUser, 'password' | 'created_at' | 'updated_at'>
