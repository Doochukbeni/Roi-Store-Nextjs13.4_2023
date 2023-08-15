import SettingsForm from "@/components/SettingsForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const session = await getAuthSession();

  const dbUser = await db.user.findUnique({
    where: { email: session?.user.email! },
  });

  if (!dbUser?.id) {
    redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: dbUser.id,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <main className="flex flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </main>
  );
};

export default SettingsPage;
