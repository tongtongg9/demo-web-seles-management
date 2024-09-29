import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TFormUser, userSchema } from '../form-schema';
import { Spinner } from '@/components/shared/spinner';
import { useNavigate } from 'react-router-dom';

type FormUserProps = {
    type: 'add' | 'edit';
    isLoading?: boolean;
    defaultValues?: TFormUser;
    onSubmit: (values: TFormUser) => void;
    onCancel?: () => void;
};

export default function FormUser({ onSubmit, isLoading, defaultValues, type, onCancel }: FormUserProps) {
    const navigate = useNavigate();

    const form = useForm<TFormUser>({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    function onReset() {
        form.reset();
    }

    function handleCancel() {
        navigate(-1);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="Email address (e.g.john@email.com)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="first_name"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="First name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="last_name"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="phone_number"
                    disabled={isLoading}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2 mt-2">
                    {type === 'edit' && (
                        <Button type="button" variant="ghost" onClick={onCancel || handleCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="button" variant="ghost" onClick={onReset} disabled={isLoading}>
                        Reset
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Spinner className="mr-2" />}
                        {type === 'add' ? 'Submit' : 'Update'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
