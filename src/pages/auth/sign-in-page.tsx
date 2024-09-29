import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signInSchema, TSignInSchema } from '@/features/auth/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Spinner } from '@/components/shared/spinner';
import { useSignIn } from '@/features/auth/hooks/use-auth';

export default function SignInPage() {
    const { mutate: mutateSignIn, isPending } = useSignIn();

    const form = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema),
    });

    function onSubmit(values: TSignInSchema) {
        mutateSignIn(values);
    }

    return (
        <main className="flex flex-col flex-1 justify-center items-center px-6 min-h-full container">
            <Card className="w-full max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>Enter your email below to login to your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="gap-4 grid">
                            <FormField
                                control={form.control}
                                name="email"
                                disabled={isPending}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                disabled={isPending}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input id="password" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isPending}>
                                {isPending && <Spinner className="mr-2" />}
                                Sign in
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </main>
    );
}
