import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }
  const dbUser = await db.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!dbUser) return;

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: dbUser?.id,
    },
  });
  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
