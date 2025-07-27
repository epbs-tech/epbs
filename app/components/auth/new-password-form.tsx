"use client"

import {CardWrapper} from "@/app/components/auth/card-wrapper";
import { useState, useTransition} from "react";
import {FormSuccess} from "@/app/components/form-success";
import {FormError} from "@/app/components/form-error";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {NewPasswordSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {newPassword} from "@/actions/new-password";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSearchParams} from "next/navigation";


export const NewPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");


        startTransition(()=>{
            newPassword(values, token)
                .then((data) =>{
                     setError(data?.error);
                     setSuccess(data?.success);
                });
        })
    };

    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login?"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6">
                    <div className="space-y-4">
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" className="w-full cursor-pointer btn-primary" disabled={isPending}>
                        Resset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};