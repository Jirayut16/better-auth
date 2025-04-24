"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { signInSchema as formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const Signin = () => {
  const toastId = "sign-in-toast";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          toast.loading("Signing in...", {
            id: toastId,
          });
        },
        onSuccess: () => {
          form.reset();
          toast.success("Signed in successfully", {
            style: {
              background: "#0dd157",
              border: "1px solid #0dd157",
              color: "white",
            },
          });
          toast.dismiss(toastId);
        },
        onError: () => {
          toast.error("Sign in failed", {
            style: {
              background: "#fb4143",
              border: "1px solid #fb4143",
              color: "white",
            },
          });
          toast.dismiss(toastId);
          form.setError("email", {
            type: "manual",
          });
          form.setError("password", {
            type: "manual",
            message: "Invalid email or password",
          });
        },
      }
    );

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-destructive hover:bg-red-500 transition-colors duration-300 ease-in-out cursor-pointer"
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </Form>
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
