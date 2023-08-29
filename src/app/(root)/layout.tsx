import { db } from "@/lib/db";
import { userSession } from "@/lib/user-sessionId";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await userSession();

  const store = await db.store.findFirst({
    where: { userId: userId },
  });

  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
