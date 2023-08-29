import SettingsForm from "@/components/SettingsForm";
import { db } from "@/lib/db";
import { userSession } from "@/lib/user-sessionId";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const userId = await userSession();

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <main className="flex flex-col  dark:bg-slate-900 dark:text-slate-200">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </main>
  );
};

export default SettingsPage;
