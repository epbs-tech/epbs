"use server"
import {getVerificationTokenByToken} from "@/data/verification-token";
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";
import {sendWelcomeEmail} from "@/lib/brevo";


export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {error: 'Token does not exist!'};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return {error: 'Token expired!'};
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {error: 'Email does not exist!'};
    }

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingUser.email,
        }
    })

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });

    if (existingUser.email && existingUser.name) {
        await sendWelcomeEmail(existingUser.email, existingUser.name);
    }
    return { success: "Email verified!" };
 }