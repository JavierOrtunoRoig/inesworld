import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const blog = await getCollection("blogs");
	return rss({
		// `<title>` campo en el xml generado
		title: "Inesworld blog",
		// `<description>` campo en el xml generado
		description:
			"Explore the blog of Inés Cuevas Jiménez, also known as inesworld or inesworld.mov, where I post about my photographic adventures around the world. Discover stories, tips, and experiences from my travels, and join me on my journey as a photographer and digital nomad.",
		// Usa el "site" desde el contexto del endpoint
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array de `<item>`s en el xml generado
		// Consulta la sección "Generando `items`" para ejemplos utilizando colecciones de contenido y glob imports
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			// customData: post.data.customData,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/posts/${post.slug}/`,
		})), // (opcional) inyecta xml personalizado
		customData: `<language>en</language>`,
		stylesheet: "/rss-pretty-feed-v3.xsl",
	});
}
