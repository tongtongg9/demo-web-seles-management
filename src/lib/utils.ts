import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const disabledDate = (date: Date) => date > new Date() || date < new Date('1900-01-01');

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export function formatPhoneNumber(phoneNumber: string) {
//     const cleaned = ('' + phoneNumber).replace(/\D/g, '');
//     const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//     if (match) {
//         return '(' + match[1] + ') ' + match[2] + '-' + match[3];
//     }
//     return null;
// }

export function formatInitials(fn: string, ln: string) {
    return `${fn.charAt(0)}${ln.charAt(0)}`;
}

export const formatNumber = (num: number | string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'THB',
    }).format(Number(num)).replace('THB', '');
};
