import Navbar from "@/components/Navbar";
import { db } from "@/lib/db";
import { userSession } from "@/lib/user-sessionId";
import { redirect } from "next/navigation";

export default async function ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const userId = await userSession();

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });
  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      <div className="pt-5">{children}</div>
    </>
  );
}
