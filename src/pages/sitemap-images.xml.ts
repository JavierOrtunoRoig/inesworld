import type { APIRoute } from "astro";

const sitemapImages = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>https://inesworld.vercel.app/</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>1.0</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/hero_image.H3mTBxdf_Z1jHgKr.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/antes.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/despues.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/1.VA5Wp3Fu_Z2reM7N.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/1.zMhlcR5x_1Cw9Ek.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/1.zLcEiEWw_xEk5x.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/about</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>1.0</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/hero_image.H3mTBxdf_Z2gf6g8.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/IMG_8157.EzL_Iwsc_Z2pNYvB.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/blog</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>1.0</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/1.kmF9CJDr_1SIdmF.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/portfolio</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>1.0</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/1.zLcEiEWw_ZELlJQ.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/1.VA5Wp3Fu_1pvEPJ.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/1.zMhlcR5x_p5sNV.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/contact</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>1.0</priority></url><url><loc>https://inesworld.vercel.app/map</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>1.0</priority></url><url><loc>https://inesworld.vercel.app/es/</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/trip/indonesia</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>0.8</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/1.VA5Wp3Fu_Z1NM9S.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/4.Zb19cKTG_1AiBpH.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/7.bGpi8h0-_Z15Y6Ll.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/10.lrxqR1TG_1lEm3W.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/2.NCHCZIlC_Z2rRdLh.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/5.Jk2h4Eiv_1T3nL3.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/8.7-5Qnai7_Zonbys.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/11.bBYqWTtF_Z1NnOap.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/3.lsfYtTL6_UsvqB.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/6.MNsXh1f5_kdRjM.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/9.E59_IY9a_smpeT.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/trip/vietnam</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>0.8</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/1.zMhlcR5x_Z12eYbG.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/4.wiF22E3i_2lDd7O.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/2.NCtbrvDr_Z14E5bT.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/5.uICvjt-O_1WWKwU.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/3.rvhKNYDw_2bGYEy.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/6.vgAbq2dy_1wtjks.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/trip/switzerland</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>0.8</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/1.zLcEiEWw_Z276NKt.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/4.-39dNUeT_17gd3A.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/7.7Bs3y1eR_dF18v.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/10.iIdsN9ro_Z25SLCR.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/13.6OZ9cL_o_1QVrQz.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/16.Ib4K-QrI_2sus27.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/19.ZgMH9KRU_Zp4SSj.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/22.LTX5N9xF_CarAr.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/2.EzKyVnSp_1FA7wl.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/5.ArfyDeB3_Z2sKVuW.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/8.54obPXfG_Z1O7XDe.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/11.QN8PQdS__1U9U7o.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/14.-BlLfd6w_Z1n4uzq.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/17.wTtUHA7e_Z5uQpw.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/20.EObPJcy2_dESNf.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/3.1yH8K7A9_jevq.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/6.AlRlzwrw_Z7JMEu.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/9.VSjDZX1v_JPNBY.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/12.vQUJOKy0_Z2pMoTR.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/15.RhpiCvF4_22e2Hf.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/18.68j2ghIZ_1aS9K1.webp</image:loc></image:image><image:image><image:loc>https://inesworld.vercel.app/_astro/21.E3hn_fiZ_Z1Ff59p.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/about/</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/about/</loc><lastmod>2024-06-19T22:40:35+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/blog/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/blog/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/posts/my-trip-in-oslo</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.8</priority><image:image><image:loc>https://inesworld.vercel.app/_astro/1.kmF9CJDr_Z7fBDa.webp</image:loc></image:image></url><url><loc>https://inesworld.vercel.app/portfolio/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/portfolio/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/contact/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/contact/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/map/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/map/</loc><lastmod>2024-06-19T22:40:37+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/about</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/blog</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/portfolio</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/contact</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/es/map</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.8</priority></url><url><loc>https://inesworld.vercel.app/trip/indonesia/</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/trip/indonesia/</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.4</priority></url><url><loc>https://inesworld.vercel.app/trip/vietnam/</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/trip/vietnam/</loc><lastmod>2024-06-19T22:40:38+01:00</lastmod><priority>0.4</priority></url><url><loc>https://inesworld.vercel.app/trip/switzerland/</loc><lastmod>2024-06-19T22:40:39+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/trip/switzerland/</loc><lastmod>2024-06-19T22:40:39+01:00</lastmod><priority>0.4</priority></url><url><loc>https://inesworld.vercel.app/posts/my-trip-in-oslo/</loc><lastmod>2024-06-19T22:40:39+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/posts/my-trip-in-oslo/</loc><lastmod>2024-06-19T22:40:39+01:00</lastmod><priority>0.4</priority></url><url><loc>https://inesworld.vercel.app/es/trip/switzerland</loc><lastmod>2024-06-19T22:40:40+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/trip/indonesia</loc><lastmod>2024-06-19T22:40:40+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/trip/vietnam</loc><lastmod>2024-06-19T22:40:40+01:00</lastmod><priority>0.6</priority></url><url><loc>https://inesworld.vercel.app/es/posts/my-trip-in-oslo</loc><lastmod>2024-06-19T22:40:41+01:00</lastmod><priority>0.6</priority></url></urlset>`;

export const GET: APIRoute = () => {
	return new Response(sitemapImages, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
