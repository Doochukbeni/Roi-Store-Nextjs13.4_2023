"use client";

import React, { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import { SizeColumn } from "./SizeColumns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { CustomButton } from "@/components/ui/CustomButton";
import AlertModal from "@/components/modals/AlertModal";

interface CellActionProps {
  data: SizeColumn;
}

const CellActions = ({ data }: CellActionProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("size Id copied to clipboard");
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      setIsOpen(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      router.refresh();
      toast.success("Size deleted successfully");
    } catch (error) {
      toast.error(
        "something went wrong. make sure you remove all products using this size"
      );
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </CustomButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4 " /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4 " /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-4 w-4 " /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
