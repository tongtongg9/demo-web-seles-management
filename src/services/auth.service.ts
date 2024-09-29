import axios from '@/lib/axios';
import { TUser } from '@/types';
type TSingInPayload = Pick<TUser, 'email' | 'password'>;

class AuthService {
    async signIn(payload: TSingInPayload) {
        const user = await axios
            .get<Array<TUser>>('/users')
            .then((res) => res.data.find((u) => u.email === payload.email))
            .catch((err) => {
                throw new Error(err.response.data.message);
            });

        if (!user || user.password !== payload.password) {
            throw new Error('Invalid email or password');
        }

        return user;
    }

    async signOut() {
        return new Promise((resolve) => {
            localStorage.removeItem('_auth');
            resolve(true);
        });
    }
}

export default new AuthService();
