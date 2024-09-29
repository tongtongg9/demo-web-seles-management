import { TRole } from './role.type';

export type TUser = {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: TRole;
    status: 'active' | 'suspended';
    created_at: string;
    updated_at: string;
};
