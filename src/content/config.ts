import { defineCollection, z } from 'astro:content';
// 2. Define tu colección(es)
const blogsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()). optional(),
    draft: z.boolean().optional().default(false),
    image: z.object({
      src: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
  })
});
export const collections = {
  'blogs': blogsCollection,
};