import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function userSession() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/sign-in");
  }
  const dbUser = await db.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!dbUser) return;

  const userId = dbUser?.id;

  return userId;
}
