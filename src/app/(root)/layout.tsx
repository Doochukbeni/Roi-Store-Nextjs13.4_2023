import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
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
    where: { userId: dbUser.id },
  });

  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
