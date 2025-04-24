import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const user = session?.user;

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-4xl font-bold underline">Welcome to the dashboard</h1>
      <p className="text-xl">Name: {user.name}</p>
      <p className="text-xl">Email: {user.email}</p>
    </div>
  );
};
export default Dashboard;
