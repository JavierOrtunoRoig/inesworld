import { defineCollection, z } from 'astro:content';
// 2. Define tu colección(es)
const blogsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()). optional(),
    draft: z.boolean().optional().default(false),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  })
});
export const collections = {
  'blogs': blogsCollection,
};