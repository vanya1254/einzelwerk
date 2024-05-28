"use client";

import React from "react";
import { FieldPath, Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../CustomForm";
import { Checkbox } from "../ui/checkbox";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";

interface CustomCheckboxPropsT {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

export const CustomCheckbox: React.FC<CustomCheckboxPropsT> = ({
  name,
  label,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="m0 flex items-center gap-4 pt-1 pb-1">
          <FormControl>
            <Checkbox
              className="border-gray-200 checked"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="m0 text-gray-500 text-base/[26px] cursor-pointer">
            {label}
          </FormLabel>
        </FormItem>
      )}
    />
  );
};
