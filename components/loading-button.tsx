import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

export const LoadingButton = ({
  pending,
  children,
  classname,
  onclick,
}: {
  pending: boolean;
  children: React.ReactNode;
  classname?: string;
  onclick?: () => void;
}) => {
  return (
    <Button
      disabled={pending}
      onClick={onclick}
      className={`w-full ${classname}`}
    >
      {pending ? (
        <div className="flex justify-center items-center gap-2">
          <LoaderCircle className="animate-spin" />
          Please wait...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
