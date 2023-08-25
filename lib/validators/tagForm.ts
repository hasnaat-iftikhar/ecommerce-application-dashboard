import { z } from "zod";

export const TagFormValidator = z.object({
  name: z.string(),
});

export type TagFormPayload = z.infer<typeof TagFormValidator>;
