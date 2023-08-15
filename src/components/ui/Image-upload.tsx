"use client";

import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./Button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <CustomButton
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </CustomButton>
            </div>
            <Image src={url} alt="image upload" fill className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ae4jib8l">
        {({ open }) => {
          const onClick = () => open();
          return (
            <CustomButton
              disabled={disabled}
              type="button"
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </CustomButton>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
