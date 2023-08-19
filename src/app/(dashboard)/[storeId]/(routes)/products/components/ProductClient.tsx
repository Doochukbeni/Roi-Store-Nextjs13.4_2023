"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { CustomButton } from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/Separator";

import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ui/ApiList";
import { ProductColumn, columns } from "./ProductColumns";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage Products for your Store"
          title={`Products (${data?.length})`}
        />
        <CustomButton
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </CustomButton>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Products" title="API" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductClient;
