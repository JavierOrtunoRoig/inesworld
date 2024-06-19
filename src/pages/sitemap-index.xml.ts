import type { APIRoute } from "astro";

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://inesworld.vercel.app/sitemap-0.xml</loc></sitemap><sitemap><loc>https://inesworld.vercel.app/sitemap-images.xml</loc></sitemap></sitemapindex>`;

export const GET: APIRoute = () => {
	return new Response(sitemapIndex, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
