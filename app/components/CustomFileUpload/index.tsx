"use client";

import React from "react";
import { Control } from "react-hook-form";
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

interface CustomFileUploadPropsT {
  formControl: Control<z.infer<typeof formSchema>, any>;
}

export const CustomFileUpload: React.FC<CustomFileUploadPropsT> = ({
  formControl,
}) => {
  return (
    // <CustomFormField
    //   name="files"
    //   inputType="file"
    //   label={label}
    //   placeholder={placeholder}
    //   description={description}
    //   formControl={formControl}
    // />
    <FormField
      control={formControl}
      name="files"
      render={({ field }) => (
        <FormItem className="flex gap-4 w-full">
          <FormDescription className="flex gap-3 flex-col w-[310px] shrink-0">
            <span className="text-base font-medium text-gray-950 h-9">
              Dokument hochladen
            </span>
            <span className="text-xs/[18px] text-gray-400">
              Klicken Sie auf die Schaltfläche oder ziehen Sie ein Dokument im
              PDF-, DOCX-, PNG.
            </span>
          </FormDescription>
          <FormLabel className="m0 flex justify-center pt-[42px] pb-[42px] border border-dashed rounded-[20px] border-gray-400 w-full cursor-pointer">
            <FormControl>
              {
                // @ts-ignore
                <Input
                  {...field}
                  multiple
                  type="file"
                  accept=".pdf,.docx,.png"
                  onChange={field.onChange}
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
        </FormItem>
      )}
    />
  );
};
