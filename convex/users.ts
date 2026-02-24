import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createOrUpdate = mutation({
	args: {
		clerkId: v.string(),
		name: v.string(),
		email: v.string(),
		imageUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.first();

		if (existing) {
			await ctx.db.patch(existing._id, {
				name: args.name,
				email: args.email,
				imageUrl: args.imageUrl,
			});
			return existing._id;
		}

		return await ctx.db.insert("users", {
			...args,
			createdAt: Date.now(),
		});
	},
});

export const getCurrent = query({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.first();
	},
});
