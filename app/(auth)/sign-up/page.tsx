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
import { signupSchema } from "@/lib/auth-schema";
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

const SignUp = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const { name, email, password } = values;
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image:
          "https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png",
      },
      {
        onRequest: () => {
          setPending(true);
          {
            ToastLoading({ message: "Signing up..." });
          }
        },
        onSuccess: () => {
          form.reset();
          {
            ToastSuccess({
              message: "Signed up successfully, please verify your email",
            });
          }
          {
            ToastDismiss();
          }
          router.push("/sign-in");
        },
        onError: (ctx) => {
          {
            ToastError({ message: "Sign up failed" });
          }
          form.setError("email", {
            type: "manual",
            message: ctx.error.message,
          });
          {
            ToastDismiss();
          }
        },
      }
    );
    setPending(false);

    console.log({ data, error });
  }
  // console.log(form.formState.errors);

  return (
    <Card className="w-full max-w-md mx-auto text-white" id="glass">
      <CardHeader>
        <CardTitle className="text-4xl text-center">Sing up</CardTitle>
        <CardDescription className="text-lg text-center">
          Create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              pending={pending}
              classname="bg-destructive hover:bg-red-500 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Sign up
            </LoadingButton>
            <hr />
          </form>
        </Form>
        <div className="flex gap-2 justify-between mt-4">
          <LoginWithGoogleButton text="Sign up with Google" />
          <LoginWithGithubButton text="Sign up with Github" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?
          <Link href="/sign-in" className="text-white hover:underline">
            {" "}
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
export default SignUp;
