"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, FieldPath, Control } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Checkbox } from "../ui/checkbox";
import { tree } from "next/dist/build/templates/app-page";

const phoneRegex = new RegExp(
  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
);

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter valid phone number: +7 999 999-99-99",
  }),
  email: z.string().email(),
  skills: z
    .custom<Option>()
    .array()
    .min(1, { message: "Please choose option(s)" }),
  agree: z
    .boolean()
    .refine((val) => val, { message: "Please check the agreement" }),
});

export const CustomForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      skills: [],
      agree: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <CustomFormField
          name="name"
          placeholder="Name"
          inputType="name"
          formControl={form.control}
        />
        <CustomFormField
          name="phone"
          placeholder="Phone"
          inputType="phone"
          formControl={form.control}
        />
        <CustomFormField
          name="email"
          placeholder="Email"
          inputType="email"
          formControl={form.control}
        />
        <CustomFormSelect
          name="skills"
          placeholder="Your skills"
          formControl={form.control}
          options={[
            { value: "string", label: "string" },
            { value: "22", label: "22" },
            { value: "str333ing", label: "str333ing" },
          ]}
        />
        <CustomFormCheckbox
          name="agree"
          label="I’m agree with every data you collect"
          formControl={form.control}
        />
        <Button>Send</Button>
      </form>
    </Form>
  );
};

interface CustomFormFieldPropsT {
  name: FieldPath<z.infer<typeof formSchema>>;
  label?: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

const CustomFormField: React.FC<CustomFormFieldPropsT> = ({
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
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {
              // @ts-ignore
              <Input
                placeholder={placeholder}
                type={inputType || "text"}
                {...field}
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

interface CustomFormSelectPropsT {
  name: FieldPath<z.infer<typeof formSchema>>;
  label?: string;
  placeholder: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
  options: Option[];
}

const CustomFormSelect: React.FC<CustomFormSelectPropsT> = ({
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

interface CustomFormCheckboxPropsT {
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  formControl: Control<z.infer<typeof formSchema>, any>;
}

const CustomFormCheckbox: React.FC<CustomFormCheckboxPropsT> = ({
  name,
  label,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
