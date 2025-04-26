"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ToastDismiss, ToastError } from "./toast";
import { Button } from "./ui/button";
import Image from "next/image";

const LoginWithGithubButton = ({ text }: { text: string }) => {
  const router = useRouter();
  const handleSigninWithGithub = async () => {
    const data = await authClient.signIn.social(
      {
        provider: "github",
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
      type="button"
      onClick={handleSigninWithGithub}
      className="flex gap-2 bg-white hover:bg-gray-200 text-black transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <Image src={"/github.png"} alt="github" width={20} height={20} priority />
      {text}
    </Button>
  );
};
export default LoginWithGithubButton;
