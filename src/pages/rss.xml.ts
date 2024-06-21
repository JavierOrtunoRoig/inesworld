import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
	const blog = await getCollection("blogs");
	return rss({
		//'xmlns:media="http://search.yahoo.com/mrss/"',
		xmlns: {
			media: "http://search.yahoo.com/mrss/",
			atom: "http://www.w3.org/2005/Atom",
		},
		// `<title>` campo en el xml generado
		title: "Inesworld blog",
		// `<description>` campo en el xml generado
		description:
			"Explore the blog of Inés Cuevas Jiménez, also known as inesworld or inesworld.mov, where I post about my photographic adventures around the world. Discover stories, tips, and experiences from my travels, and join me on my journey as a photographer and digital nomad.",
		// Usa el "site" desde el contexto del endpoint
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: `${context.site}/blog`,
		// Array de `<item>`s en el xml generado
		// Consulta la sección "Generando `items`" para ejemplos utilizando colecciones de contenido y glob imports
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			content: sanitizeHtml(parser.render(post.body), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
			}),
			// customData: post.data.customData,
			// Compute RSS link from post `slug`
			// This example assumes all posts are rendered as `/blog/[slug]` routes
			link: `/posts/${post.slug}/`,
			customData: `
        <media:content url="https://inesworld.vercel.app/ines.webp" type="image/webp" medium="image">
          <media:credit>Ines Cuevas Jiménez</media:credit>
          <media:title>${post.data.image.alt}</media:title>
          <media:text>${post.data.image.alt}</media:text>
          <media:description>${post.data.image.alt}</media:description>
        </media:content>
      `,
		})), // (opcional) inyecta xml personalizado
		customData: `<language>en</language><image>
      <url>https://inesworld.vercel.app/ines.webp</url>
      <title>Image of Ines Cuevas Jiménez | inesworld | ineworld.mov</title>
      <link>https://inesworld.vercel.app/</link>
    </image>`,
		// stylesheet: "/rss-pretty-feed-v3.xsl",
	});
}
