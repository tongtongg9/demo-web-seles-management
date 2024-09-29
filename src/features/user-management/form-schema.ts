import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    first_name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
});

export type TFormUser = z.infer<typeof userSchema>;
