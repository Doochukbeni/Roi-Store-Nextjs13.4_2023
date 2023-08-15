"use client";
import React from "react";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import ApiAlert from "../Api-Alert";
interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityIdName, entityName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        description={`${baseUrl}/${entityName}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}`}
        title="POST"
        variant="admin"
      />

      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="PATCH"
        variant="admin"
      />
      <ApiAlert
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        title="DELETE"
        variant="admin"
      />
    </>
  );
};

export default ApiList;
