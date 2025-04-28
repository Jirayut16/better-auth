"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  ToastDismiss,
  ToastError,
  ToastLoading,
  ToastSuccess,
} from "@/components/toast";
import { LoadingButton } from "@/components/loading-button";
import { useState } from "react";
import LoginWithGoogleButton from "@/components/login-google";
import LoginWithGithubButton from "@/components/login-github";

const Signin = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          {
            ToastLoading({ message: "Signing in..." });
          }
          setPending(true);
        },
        onSuccess: () => {
          form.reset();
          {
            ToastSuccess({ message: "Signed in successfully" });
          }
          {
            ToastDismiss();
          }
          router.push("/dashboard");
        },
        onError: (ctx) => {
          {
            ToastError({ message: "Sign in failed" });
          }
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            form.setError("password", {
              type: "manual",
              message: "Invalid email or password",
            });
          }
          if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            form.setError("password", {
              type: "manual",
              message: "Please verify your email",
            });
          } else {
            form.setError("email", {
              type: "manual",
              message: ctx.error.message,
            });
          }

          {
            ToastDismiss();
          }
        },
      }
    );
    setPending(false);
    console.log({ data, error });
  }

  return (
    <Card className="w-full max-w-md mx-auto text-white" id="glass">
      <CardHeader>
        <CardTitle className="text-4xl text-center">Sing in</CardTitle>
        <CardDescription className="text-lg text-center">
          Welcome back! Please enter your details
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              pending={pending}
              classname="bg-destructive hover:bg-red-500 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Sign in
            </LoadingButton>
            <hr />
          </form>
        </Form>
        <div className="flex gap-2 justify-between mt-4 w-full">
          <div className="w-full">
            <LoginWithGoogleButton text="Continue with Google" />
          </div>
          <div className=" w-full">
            <LoginWithGithubButton text="Continue with Github" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link href="/sign-up" className="text-white hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default Signin;
