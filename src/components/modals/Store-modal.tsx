"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

// this component is the same with modalContent file but it is more dynamic and prevent hydration error

const formSchema = z.object({
  name: z.string().min(3),
});

const StoreModal = () => {
  const storeModal = useStoreModal();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(values);
    try {
      const response = await axios.post("/api/store", values);

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast({
        title: " something went wrong try again",
        description: "There was an error creating store",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Create Store"
      description="Create a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="p-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  isLoading={isLoading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button isLoading={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
