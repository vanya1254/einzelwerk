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
  FormMessage,
} from "../ui/form";
import MultipleSelector, { Option } from "../ui/multiple-selector";

interface CustomSelectPropsT {
  name: FieldPath<z.infer<typeof formSchema>>;
  label?: string;
  placeholder: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
  options: Option[];
}

export const CustomSelect: React.FC<CustomSelectPropsT> = ({
  name,
  label,
  placeholder,
  formControl,
  options,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {
              // @ts-ignore
              <MultipleSelector
                options={options}
                placeholder={placeholder}
                {...field}
              />
            }
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
