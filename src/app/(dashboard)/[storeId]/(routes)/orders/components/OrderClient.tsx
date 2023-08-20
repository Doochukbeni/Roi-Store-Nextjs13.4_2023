"use client";

import Heading from "@/components/Heading";

import { Separator } from "@/components/ui/Separator";

import { DataTable } from "@/components/ui/DataTable";

import { OrderColumn, columns } from "./OrderColumns";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data?.length})`}
        description="Manage Orders for your Store"
      />

      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
