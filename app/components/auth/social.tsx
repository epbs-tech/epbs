"use client"
import { FcGoogle} from "react-icons/fc";
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {useSearchParams} from "next/navigation";


export const Social = () => {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl : callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    }
    return (
        <div className="flex flex-col sm:flex-row w-full items-center gap-2">
            <Button
                size="lg"
                className="w-full cursor-pointer"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>


    );
};