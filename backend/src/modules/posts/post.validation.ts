import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(2000).optional(),
  category: z
    .enum(["illustration", "photography", "design", "animation", "music", "writing", "other"])
    .optional(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  isPublished: z.boolean().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
