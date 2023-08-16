import { z } from "zod";

export const CategoryFormValidator = z.object({
  name: z.string(),
});

export type CategoryFormPayload = z.infer<typeof CategoryFormValidator>;
