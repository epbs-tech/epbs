import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/app/components/auth/header";
import {BackButton} from "@/app/components/auth/back-button";


export const ErrorCard = () => {
    return (
        <Card className="w-full max-w-[400px] shadow-md mx-auto px-4">
            <CardHeader>
                <Header label="Oops! Something went wrong" />
            </CardHeader>
            <CardFooter>
                <BackButton href="auth/login" label="Back to login" />
            </CardFooter>
        </Card>
    )
}