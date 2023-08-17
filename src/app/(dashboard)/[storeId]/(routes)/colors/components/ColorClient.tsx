"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { CustomButton } from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/Separator";

import { ColorColumn, columns } from "./ColorColumns";
import { DataTable } from "@/components/ui/DataTable";
import ApiList from "@/components/ui/ApiList";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient = ({ data }: ColorClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage Colors for your Products"
          title={`Colors (${data?.length})`}
        />
        <CustomButton
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </CustomButton>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading description="API calls for Colors" title="API" />
      <Separator />
      <ApiList entityIdName="colorId" entityName="colors" />
    </>
  );
};

export default ColorClient;
