"use client"
import {CardWrapper} from "@/app/components/auth/card-wrapper";
import {useTransition, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {FormError} from "@/app/components/form-error";
import {FormSuccess} from "@/app/components/form-success";
import {login} from "@/actions/login";
import { useSearchParams} from "next/navigation";
import Link from "next/link";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!": "";

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(()=>{
            login(values, callbackUrl)
                .then((data) =>{
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    }
                    if (data?.success){
                        form.reset();
                        setSuccess(data?.success);
                    }
                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                        setError("");
                    }
                })
                .catch(async () =>{
                    //setError("Something went wrong");
                    window.location.href = callbackUrl || DEFAULT_LOGIN_REDIRECT
                });
        })
    };

    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            // showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="space-y-4">
                        { showTwoFactor && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    type="text"
                                                    {...field}
                                                    placeholder="Enter your code"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        { !showTwoFactor && (
                            <>
                                <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="email"
                                            {...field}
                                            placeholder="Enter your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                                />
                          <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="password"
                                            {...field}
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <Button
                                        size="sm"
                                        variant='link'
                                        asChild
                                        className="px-0 font-normal"
                                    >
                                        <Link href="/auth/reset">
                                            Forgot password?
                                        </Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            </>)
                        }
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error || urlError} />
                    <Button type="submit" className="w-full cursor-pointer btn-primary" disabled={isPending}>
                        {showTwoFactor ? isPending ? "Verifying..." : "Verify Code" : isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};