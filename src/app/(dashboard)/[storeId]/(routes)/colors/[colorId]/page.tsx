import { db } from "@/lib/db";

import ColorForm from "../components/ColorForm";

const CreateNewColors = async ({
  params,
}: {
  params: { colorId: string; storeId: string };
}) => {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default CreateNewColors;
