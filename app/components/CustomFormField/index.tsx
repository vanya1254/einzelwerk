"use client";

import React from "react";
import { FieldPath, Control } from "react-hook-form";
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

interface CustomFormFieldPropsT {
  name: FieldPath<z.infer<typeof formSchema>>;
  label?: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

export const CustomFormField: React.FC<CustomFormFieldPropsT> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {
              // @ts-ignore
              <Input
                {...field}
                placeholder={placeholder}
                type={inputType || "text"}
              />
            }
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
