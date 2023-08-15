"use client";

import * as z from "zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Heading from "@/components/Heading";
import { CustomButton } from "@/components/ui/CustomButton";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/AlertModal";
import ApiAlert from "./Api-Alert";
import useOrigin from "@/hooks/use-origin";

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(4),
});

type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm = ({ initialData }: SettingFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const origin = useOrigin();

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/store/${params.storeId}`, data);
      router.refresh();
      toast({ title: "Store Update successful", variant: "default" });
    } catch (error) {
      toast({
        title: "There was a problem",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      setIsOpen(true);
      await axios.delete(`/api/store/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({ title: "Store deleted successfully" });
    } catch (error) {
      toast({
        title: "make sure you removed all Products and Categories first",
        variant: "destructive",
      });
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
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store data" />
        <CustomButton
          variant="destructive"
          disabled={loading}
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </CustomButton>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-fit"
        >
          <div className="grid grid-col-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button isLoading={loading} type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
