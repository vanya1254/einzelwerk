"use client";

import React, { useEffect, useRef, useState } from "react";
import { Control, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../CustomForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface CustomFileUploadPropsT {
  formControl: Control<z.infer<typeof formSchema>, any>;
}

export const CustomFileUpload: React.FC<CustomFileUploadPropsT> = ({
  formControl,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onClickDelete = (file: File) => {
    setFiles((prev) => {
      return [...prev.filter((f) => file.name !== f.name)];
    });
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<typeof formSchema._type, "files">
  ) => {
    const filesList = e.currentTarget.files as FileList;

    for (let i = 0; i < filesList.length; i++) {
      const file = filesList?.item(i) as File;
      setFiles((prev) => {
        return [...prev.filter((f) => f.name !== file.name), file];
      });
    }

    return field.onChange(files);
  };

  return (
    <FormField
      control={formControl}
      name="files"
      render={({ field }) => (
        <FormItem className="flex gap-4 w-full">
          <div className="flex gap-3 flex-col w-[310px] shrink-0">
            <FormDescription className="flex gap-3 flex-col">
              <span className="text-base font-medium text-gray-950 h-9">
                Dokument hochladen
              </span>
              <span className="text-xs/[18px] text-gray-400">
                Klicken Sie auf die Schaltfläche oder ziehen Sie ein Dokument im
                PDF-, DOCX-, PNG.
              </span>
            </FormDescription>
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <Badge
                  className="flex items-center bg-gray-100 gap-2 hover:bg-gray-100"
                  key={file.name}
                >
                  <span className="flex items-center text-xs text-gray-950 gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.33268 1.51318V4.26688C9.33268 4.64025 9.33268 4.82693 9.40534 4.96954C9.46926 5.09498 9.57125 5.19697 9.69669 5.26088C9.8393 5.33354 10.026 5.33354 10.3993 5.33354H13.153M10.666 8.66683H5.33268M10.666 11.3335H5.33268M6.66602 6.00016H5.33268M9.33268 1.3335H5.86602C4.74591 1.3335 4.18586 1.3335 3.75803 1.55148C3.38171 1.74323 3.07575 2.04919 2.884 2.42552C2.66602 2.85334 2.66602 3.41339 2.66602 4.5335V11.4668C2.66602 12.5869 2.66602 13.147 2.884 13.5748C3.07575 13.9511 3.38171 14.2571 3.75803 14.4488C4.18586 14.6668 4.74591 14.6668 5.86602 14.6668H10.1327C11.2528 14.6668 11.8128 14.6668 12.2407 14.4488C12.617 14.2571 12.9229 13.9511 13.1147 13.5748C13.3327 13.147 13.3327 12.5869 13.3327 11.4668V5.3335L9.33268 1.3335Z"
                        stroke="#030712"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {file.name}
                  </span>
                  <svg
                    className="cursor-pointer shrink-0"
                    onClick={() => onClickDelete(file)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M14.1659 5.83398L5.83252 14.1673M5.83252 5.83398L14.1659 14.1673"
                      stroke="#030712"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Badge>
              ))}
            </div>
          </div>
          <div className="m0 flex flex-col justify-center w-full">
            <FormLabel className="m0 flex justify-center pt-[42px] pb-[42px] border border-dashed rounded-[20px] border-gray-400 w-full cursor-pointer">
              <FormControl>
                {
                  // @ts-ignore
                  <Input
                    {...field}
                    value={""}
                    multiple
                    type="file"
                    accept=".pdf,.docx,.png"
                    onChange={(e) => onChangeInput(e, field)}
                    className="hidden"
                  />
                }
              </FormControl>
              <span className="flex justify-center items-center p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="#9CA3AF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
