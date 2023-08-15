"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { CustomButton } from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/Separator";

import {
  BillboardColumn,
  columns,
} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/BillboardColumns";
import { DataTable } from "./ui/DataTable";
import ApiList from "./ui/ApiList";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage Billboard for your Store"
          title={`Billboards (${data?.length})`}
        />
        <CustomButton
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </CustomButton>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading description="API calls for Billboard" title="API" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BillboardClient;
