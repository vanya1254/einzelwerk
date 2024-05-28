"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Option } from "../ui/multiple-selector";

import {
  CustomCheckbox,
  CustomFileUpload,
  CustomFormField,
  CustomSelect,
} from "../";

const phoneRegex = new RegExp(
  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
);

export const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter name" }),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter valid phone number: +7 999 999-99-99",
  }),
  email: z.string().email(),
  skills: z
    .custom<Option>()
    .array()
    .min(1, { message: "Please choose option(s)" }),
  files: z.custom<File>().array().min(1, { message: "Please upload file(s)" }),
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
      files: [],
      agree: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[640px] flex-col gap-4 p-10 rounded-[32px] bg-white"
      >
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-gray-950 font-semibold text-[40px]/[44px]">
            Drop us a line
          </h1>
          <p className="text-xl/[30px] tracking-[-0.2px] mb-4">
            Our documentary campaigns feature leading figures, organisations and
            leaders, in open and candid discussions.
          </p>
        </div>
        <CustomFormField
          name="name"
          placeholder="Name"
          inputType="name"
          formControl={form.control}
        />
        <div className="flex w-full gap-4">
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
        </div>
        <CustomSelect
          name="skills"
          placeholder="Your skills"
          formControl={form.control}
          options={[
            { value: "Junior", label: "Junior" },
            { value: "Middle", label: "Middle" },
            { value: "Senior", label: "Senior" },
            { value: "Lead", label: "Lead" },
            { value: "CTO", label: "CTO" },
          ]}
        />
        <CustomFileUpload formControl={form.control} />
        <CustomCheckbox
          name="agree"
          label="I’m agree with every data you collect"
          formControl={form.control}
        />
        <Button className="rounded-full p-0 pl-10 pr-10 text-lg/[26px] font-medium bg-blue-600 hover:bg-blue-500">
          Send
        </Button>
      </form>
    </Form>
  );
};
