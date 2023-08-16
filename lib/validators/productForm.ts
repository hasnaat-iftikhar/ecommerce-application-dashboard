import { z } from "zod";

export const ProductFormValidator = z.object({
  name: z.string().min(5).max(20),
  image: z.string(),
  description: z.string().max(1000),
  category: z.string(),
  brand: z.string(),
  price: z.number().positive(),
  tags: z.array(z.string()),
});

export type ProductFormPayload = z.infer<typeof ProductFormValidator>;
