"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ToastDismiss, ToastError } from "./toast";
import { Button } from "./ui/button";
import Image from "next/image";

const LoginWithGoogleButton = ({ text }: { text: string }) => {
  const router = useRouter();

  const handleSigninWithGoogle = async () => {
    const data = await authClient.signIn.social(
      {
        provider: "google",
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: () => {
          {
            ToastError({ message: "Sign in failed" });
          }
          {
            ToastDismiss();
          }
        },
      }
    );
    console.log(data);
  };

  return (
    <Button
      onClick={handleSigninWithGoogle}
      className="flex gap-2 bg-white hover:bg-gray-200 text-black transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <Image src={"/google.png"} alt="google" width={20} height={20} priority />
      {text}
    </Button>
  );
};
export default LoginWithGoogleButton;
