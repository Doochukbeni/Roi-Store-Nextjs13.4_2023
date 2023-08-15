"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "../ui/Button";
import { CustomButton } from "../ui/CustomButton";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Are you sure about this?"
      description="This action is not reversible."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <CustomButton disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </CustomButton>
        <Button isLoading={loading} variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
