"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { CustomButton } from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/Separator";

import { CategoryColumn, columns } from "./CategoryColumns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ui/ApiList";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage category for your Store"
          title={`Category (${data?.length})`}
        />
        <CustomButton
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </CustomButton>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading description="API calls for Categories" title="API" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
