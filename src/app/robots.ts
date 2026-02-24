import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl =
		process.env.NEXT_PUBLIC_APP_URL ?? "https://subtoku.vercel.app";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/dashboard", "/subscriptions", "/calendar", "/settings"],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
