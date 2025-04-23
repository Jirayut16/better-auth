import { AirVent } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/">
          <AirVent className="w-6 h-6" />
          <span className="font-bold">Better Auth</span>
        </Link>
        <div>
          <Link href="/sign-in" className={buttonVariants()}>
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
