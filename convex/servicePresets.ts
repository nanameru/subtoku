import { mutation, query } from "./_generated/server";

export const getAll = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("servicePresets").collect();
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db.query("servicePresets").first();
		if (existing) return;

		const presets = [
			{
				name: "Netflix",
				nameJa: "Netflix",
				defaultAmount: 790,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#e50914",
			},
			{
				name: "Amazon Prime",
				nameJa: "Amazon Prime",
				defaultAmount: 600,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#00a8e1",
			},
			{
				name: "Spotify",
				nameJa: "Spotify",
				defaultAmount: 980,
				defaultCycle: "monthly" as const,
				categoryName: "音楽",
				color: "#1db954",
			},
			{
				name: "Apple Music",
				nameJa: "Apple Music",
				defaultAmount: 1080,
				defaultCycle: "monthly" as const,
				categoryName: "音楽",
				color: "#fc3c44",
			},
			{
				name: "YouTube Premium",
				nameJa: "YouTube Premium",
				defaultAmount: 1280,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#ff0000",
			},
			{
				name: "Disney+",
				nameJa: "Disney+",
				defaultAmount: 990,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#113ccf",
			},
			{
				name: "U-NEXT",
				nameJa: "U-NEXT",
				defaultAmount: 2189,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#00bfff",
			},
			{
				name: "Hulu",
				nameJa: "Hulu",
				defaultAmount: 1026,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#1ce783",
			},
			{
				name: "dアニメストア",
				nameJa: "dアニメストア",
				defaultAmount: 550,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#ff6b00",
			},
			{
				name: "DAZN",
				nameJa: "DAZN",
				defaultAmount: 4200,
				defaultCycle: "monthly" as const,
				categoryName: "動画配信",
				color: "#f8f8f5",
			},
			{
				name: "Adobe CC",
				nameJa: "Adobe Creative Cloud",
				defaultAmount: 6480,
				defaultCycle: "monthly" as const,
				categoryName: "ツール",
				color: "#ff0000",
			},
			{
				name: "Microsoft 365",
				nameJa: "Microsoft 365",
				defaultAmount: 1490,
				defaultCycle: "monthly" as const,
				categoryName: "ツール",
				color: "#0078d4",
			},
			{
				name: "Notion",
				nameJa: "Notion",
				defaultAmount: 1650,
				defaultCycle: "monthly" as const,
				categoryName: "ツール",
				color: "#000000",
			},
			{
				name: "ChatGPT Plus",
				nameJa: "ChatGPT Plus",
				defaultAmount: 3000,
				defaultCycle: "monthly" as const,
				categoryName: "AI",
				color: "#10a37f",
			},
			{
				name: "iCloud+",
				nameJa: "iCloud+",
				defaultAmount: 130,
				defaultCycle: "monthly" as const,
				categoryName: "クラウド",
				color: "#3693f3",
			},
			{
				name: "Google One",
				nameJa: "Google One",
				defaultAmount: 250,
				defaultCycle: "monthly" as const,
				categoryName: "クラウド",
				color: "#4285f4",
			},
			{
				name: "LINE MUSIC",
				nameJa: "LINE MUSIC",
				defaultAmount: 980,
				defaultCycle: "monthly" as const,
				categoryName: "音楽",
				color: "#06c755",
			},
			{
				name: "Kindle Unlimited",
				nameJa: "Kindle Unlimited",
				defaultAmount: 980,
				defaultCycle: "monthly" as const,
				categoryName: "学習",
				color: "#ff9900",
			},
			{
				name: "Nintendo Switch Online",
				nameJa: "Nintendo Switch Online",
				defaultAmount: 306,
				defaultCycle: "monthly" as const,
				categoryName: "ゲーム",
				color: "#e60012",
			},
			{
				name: "PlayStation Plus",
				nameJa: "PlayStation Plus",
				defaultAmount: 850,
				defaultCycle: "monthly" as const,
				categoryName: "ゲーム",
				color: "#003087",
			},
		];

		for (const preset of presets) {
			await ctx.db.insert("servicePresets", preset);
		}
	},
});
