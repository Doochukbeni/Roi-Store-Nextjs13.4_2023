"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { CustomButton } from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/Separator";

import { SizeColumn, columns } from "./SizeColumns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ui/ApiList";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient = ({ data }: SizeClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage Sizes for your Products"
          title={`Sizes (${data?.length})`}
        />
        <CustomButton
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </CustomButton>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Sizes" title="API" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes" />
    </>
  );
};

export default SizeClient;
