import BillboardForm from "@/components/BillboardForm";
import { db } from "@/lib/db";
import React from "react";

const CreateNewBillboard = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default CreateNewBillboard;
