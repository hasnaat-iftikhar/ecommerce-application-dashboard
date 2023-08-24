import { z } from "zod";

export const BrandFormValidator = z.object({
  name: z.string(),
});

export type BrandFormPayload = z.infer<typeof BrandFormValidator>;
