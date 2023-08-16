import { db } from "@/lib/db";
import CategoryForm from "../components/CategoryForm";

const CreateNewCategory = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboard = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 pt-6 p-8">
        <CategoryForm billboards={billboard} initialData={category} />
      </div>
    </div>
  );
};

export default CreateNewCategory;
