import { db } from "@/lib/db";
import CategoryForm from "../components/SizeForm";

const CreateNewSizes = async ({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <CategoryForm initialData={size} />
      </div>
    </div>
  );
};

export default CreateNewSizes;
