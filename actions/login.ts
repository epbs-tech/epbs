"use server"
import * as z from "zod";
import { signIn} from "@/auth"
import { LoginSchema } from "@/schemas";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {getUserByEmail} from "@/data/user";
import {generateTwoFactorToken, generateVerificationToken} from "@/lib/token";
import {sendTwoFactorTokenEmail, sendVerificationEmail} from "@/lib/brevo";
import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";
import {db} from "@/lib/db";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";
import {AuthError} from "next-auth";

export async function login(
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
    ) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn\'t exist!" };
  }

  if (!existingUser.emailVerified ){
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email send!" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return {error: "Invalid token!"};
      }

      if (twoFactorToken.token !== code) {
        return {error: "Invalid code!"};
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return {error: "Token has expired!"};
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        })
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        },
      });
    }
    else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true};
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      // Utilisez une assertion de type pour informer TypeScript de la structure
      const authError = error as AuthError & { type: string };
    switch (authError.type) {
      case "CredentialsSignin":
        return { error: "Invalid credentials!" };
      default:
        return { error: "Something went wrong!" };
    }
    }

    throw error;
  }
}