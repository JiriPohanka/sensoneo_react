import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Product name must be less than 100 characters"),
  packaging: z.enum(["pet", "can", "glass", "tetra", "other"], {
    message: "Please select a packaging type",
  }),
  deposit: z
    .string()
    .min(1, "Deposit is required")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 10000;
    }, "Deposit must be between 0 and 10000 cents"),
  volume: z
    .string()
    .min(1, "Volume is required")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 1 && num <= 100000;
    }, "Volume must be between 1 and 100000ml"),
  companyId: z.string().min(1, "Please select a company"),
  registeredById: z.string().min(1, "Please select a user"),
});

export type ProductFormInputs = z.infer<typeof productFormSchema>;