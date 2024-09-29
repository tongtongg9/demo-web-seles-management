import axios from '@/lib/axios';
import { TSales } from '@/types';
import { nanoid } from 'nanoid';
import usersService from './users.service';

class SalesService {
    async getSales() {
        const sales = await axios
            .get<Array<TSales>>('/sales')
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return sales;
    }

    async getSalesOfSalesAnalyst(salesAnalystId: string) {
        const sales = await axios
            .get<Array<TSales>>(`/sales?sales.id=${salesAnalystId}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return sales;
    }

    async getSalesById(id: string) {
        const sales = await axios
            .get<TSales>(`/sales/${id}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return sales;
    }

    async addSales(sales: Partial<TSales>, userId: string) {
        const user = await usersService.getUser(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const newSales = {
            ...sales,
            id: nanoid(),
            sales: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.phone_number,
                role: user.role,
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        await axios
            .post('/sales', newSales)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return newSales;
    }

    async editSales(sales: Partial<TSales>) {

        if (!sales.id) {
            throw new Error('Sales ID is required');
        }

        const editSales = await axios
            .patch(`/sales/${sales.id}`, {
                ...sales,
                updated_at: new Date().toISOString(),
            })
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        return editSales;
    }

    async deleteSales(id: string) {
        await axios
            .delete(`/sales/${id}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response.data.message);
            });
    }
}

export default new SalesService();
