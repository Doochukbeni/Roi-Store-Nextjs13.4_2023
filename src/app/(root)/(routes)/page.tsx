"use client";
import ModalContent from "@/components/ModalContent";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) return onOpen();
  }, [isOpen, onOpen]);

  return null;
}
