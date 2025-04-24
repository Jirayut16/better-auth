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
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const SignUp = () => {
  const toastId = "sign-up-toast";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image:
          "https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png",
        callbackURL: "/sign-in",
      },
      {
        onRequest: () => {
          toast.loading("Signing up...", {
            id: toastId,
          });
        },
        onSuccess: () => {
          form.reset();
          toast.success("Signed up successfully", {
            style: {
              background: "#0dd157",
              border: "1px solid #0dd157",
              color: "white",
            },
          });
          toast.dismiss(toastId);
          redirect("/sign-in");
        },
        onError: (ctx) => {
          toast.error("Sign up failed", {
            style: {
              background: "#fb4143",
              border: "1px solid #fb4143",
              color: "white",
            },
          });
          form.setError("email", {
            type: "manual",
            message: ctx.error.message,
          });
          toast.dismiss(toastId);
        },
      }
    );

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your name</FormDescription>
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
              Submit
            </Button>
          </form>
        </Form>
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
