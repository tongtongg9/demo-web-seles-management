import axios from '@/lib/axios';
import { TUser } from '@/types';
import { nanoid } from 'nanoid';

const DEFAULT_NEW_USER = {
    password: '@123456',
    role: 'sales_analyst',
    status: 'active',
};

class UsersService {
    async getUsers() {
        const user = await axios
            .get<Array<TUser>>('/users')
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return user;
    }

    async getUser(userId: string) {
        const user = await axios
            .get<TUser>(`/users/${userId}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return user;
    }

    async addUser(payload: Partial<TUser>) {
        const newUser = await axios
            .post<TUser>('/users', {
                ...payload,
                ...DEFAULT_NEW_USER,
                id: nanoid(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return newUser;
    }

    async editUser(payload: Partial<TUser>) {
        const user = await axios
            .patch<TUser>(`/users/${payload.id}`, {
                ...payload,
                updated_at: new Date().toISOString(),
            })
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return user;
    }

    async deleteUser(userId: string) {
        await axios
            .delete(`/users/${userId}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }

    async changeUserStatus(payload: Pick<TUser, 'id' | 'status'>) {
        const updatedUser = await axios
            .patch<TUser>(`/users/${payload.id}`, {
                status: payload.status,
                updated_at: new Date().toISOString(),
            })
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return updatedUser;
    }
}

export default new UsersService();
