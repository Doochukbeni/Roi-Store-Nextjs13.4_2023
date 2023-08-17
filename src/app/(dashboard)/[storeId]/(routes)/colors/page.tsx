import { format } from "date-fns";

import { db } from "@/lib/db";

import { ColorColumn } from "./components/ColorColumns";

import ColorClient from "./components/ColorClient";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSize: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedSize} />
      </div>
    </div>
  );
};

export default ColorPage;
