import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Layout from "@/components/Layout/Layout";

export default async function MainLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Layout session={session} />
      <main className="flex min-h-screen flex-col items-center justify-between p-4 pt-20 sm:ml-64">
        {children}
      </main>
    </>
  );
}
