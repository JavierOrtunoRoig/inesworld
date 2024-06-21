import { defineCollection, z } from "astro:content";

// 2. Define tu colección(es)
const blogsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.date(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional().default(false),
		image: z.object({
			src: z.string(),
			publicSrc: z.string(),
			alt: z.string(),
		}),
	}),
});

// define a collection to store the data about a photo gallery with a title and a list of photos
const photoGalleryCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		photos: z.array(
			z.object({
				path: z.string(),
				description: z.string(),
			})
		),
	}),
});

export const collections = {
	blogs: blogsCollection,
	gallery: photoGalleryCollection,
};
