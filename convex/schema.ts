import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		clerkId: v.string(),
		name: v.string(),
		email: v.string(),
		imageUrl: v.optional(v.string()),
		createdAt: v.number(),
	}).index("by_clerk_id", ["clerkId"]),

	subscriptions: defineTable({
		userId: v.id("users"),
		name: v.string(),
		amount: v.number(),
		currency: v.string(),
		billingCycle: v.union(
			v.literal("monthly"),
			v.literal("yearly"),
			v.literal("weekly"),
		),
		categoryId: v.id("categories"),
		startDate: v.string(),
		nextBillingDate: v.string(),
		paymentMethod: v.optional(v.string()),
		memo: v.optional(v.string()),
		iconUrl: v.optional(v.string()),
		color: v.optional(v.string()),
		isActive: v.boolean(),
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_user", ["userId"])
		.index("by_user_active", ["userId", "isActive"]),

	categories: defineTable({
		userId: v.optional(v.id("users")),
		name: v.string(),
		color: v.string(),
		icon: v.string(),
		isPreset: v.boolean(),
		createdAt: v.number(),
	})
		.index("by_user", ["userId"])
		.index("by_preset", ["isPreset"]),

	servicePresets: defineTable({
		name: v.string(),
		nameJa: v.string(),
		defaultAmount: v.optional(v.number()),
		defaultCycle: v.union(
			v.literal("monthly"),
			v.literal("yearly"),
			v.literal("weekly"),
		),
		categoryName: v.string(),
		iconUrl: v.optional(v.string()),
		color: v.string(),
	}),
});
