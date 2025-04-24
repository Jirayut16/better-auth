"use client";
import { UserLock } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
const Navbar = () => {
  const { data: session } = authClient.useSession();
  const handleSignout = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully", {
      style: {
        background: "#0dd157",
        border: "1px solid #0dd157",
        color: "white",
      },
    });
    redirect("/sign-in");
  };

  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <UserLock className="w-8 h-8" />
          <span className="font-bold text-2xl">Better Auth</span>
        </Link>
        <div>
          {session ? (
            <Button
              onClick={handleSignout}
              type="submit"
              className="cursor-pointer"
            >
              Sign out
            </Button>
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
