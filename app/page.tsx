import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/sign-up">
        <Button>Sing up</Button>
      </Link>
    </div>
  );
}
