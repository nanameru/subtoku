import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
	args: { userId: v.optional(v.id("users")) },
	handler: async (ctx, args) => {
		const presets = await ctx.db
			.query("categories")
			.withIndex("by_preset", (q) => q.eq("isPreset", true))
			.collect();

		if (!args.userId) return presets;

		const custom = await ctx.db
			.query("categories")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.collect();

		return [...presets, ...custom.filter((c) => !c.isPreset)];
	},
});

export const create = mutation({
	args: {
		userId: v.id("users"),
		name: v.string(),
		color: v.string(),
		icon: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("categories", {
			...args,
			isPreset: false,
			createdAt: Date.now(),
		});
	},
});

export const seed = mutation({
	args: {},
	handler: async (ctx) => {
		const existing = await ctx.db
			.query("categories")
			.withIndex("by_preset", (q) => q.eq("isPreset", true))
			.first();

		if (existing) return;

		const presets = [
			{ name: "動画配信", color: "#ef4444", icon: "📺" },
			{ name: "音楽", color: "#8b5cf6", icon: "🎵" },
			{ name: "ニュース", color: "#3b82f6", icon: "📰" },
			{ name: "ゲーム", color: "#22c55e", icon: "🎮" },
			{ name: "クラウド", color: "#06b6d4", icon: "☁️" },
			{ name: "ツール", color: "#f59e0b", icon: "🔧" },
			{ name: "AI", color: "#a855f7", icon: "🤖" },
			{ name: "学習", color: "#ec4899", icon: "📚" },
			{ name: "その他", color: "#6b7280", icon: "📦" },
		];

		for (const preset of presets) {
			await ctx.db.insert("categories", {
				...preset,
				isPreset: true,
				createdAt: Date.now(),
			});
		}
	},
});
