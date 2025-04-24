import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-4xl font-bold underline">Welcome to the homepage</h1>
      {session ? (
        <Link href="/dashboard">
          <Button className="cursor-pointer">Dashboard</Button>
        </Link>
      ) : (
        <Link href="/sign-up">
          <Button className="cursor-pointer">Sing up</Button>
        </Link>
      )}
    </div>
  );
}
