import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByUser = query({
	args: { userId: v.id("users") },
	handler: async (ctx, args) => {
		const subs = await ctx.db
			.query("subscriptions")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.collect();

		const subsWithCategory = await Promise.all(
			subs.map(async (sub) => {
				const category = await ctx.db.get(sub.categoryId);
				return { ...sub, category };
			}),
		);

		return subsWithCategory;
	},
});

export const getDashboardStats = query({
	args: { userId: v.id("users") },
	handler: async (ctx, args) => {
		const subs = await ctx.db
			.query("subscriptions")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.collect();

		const activeSubs = subs.filter((s) => s.isActive);

		let monthlyTotal = 0;
		for (const sub of activeSubs) {
			if (sub.billingCycle === "monthly") {
				monthlyTotal += sub.amount;
			} else if (sub.billingCycle === "yearly") {
				monthlyTotal += Math.round(sub.amount / 12);
			} else if (sub.billingCycle === "weekly") {
				monthlyTotal += Math.round(sub.amount * 4.33);
			}
		}

		const yearlyTotal = monthlyTotal * 12;

		const now = new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();
		const upcomingThisMonth = activeSubs.filter((s) => {
			const d = new Date(s.nextBillingDate);
			return (
				d.getMonth() === currentMonth &&
				d.getFullYear() === currentYear &&
				d >= now
			);
		}).length;

		// Category breakdown
		const categoryMap = new Map<string, number>();
		for (const sub of activeSubs) {
			const cat = await ctx.db.get(sub.categoryId);
			const catName = cat?.name ?? "その他";
			const current = categoryMap.get(catName) ?? 0;
			let monthlyAmount = sub.amount;
			if (sub.billingCycle === "yearly")
				monthlyAmount = Math.round(sub.amount / 12);
			if (sub.billingCycle === "weekly")
				monthlyAmount = Math.round(sub.amount * 4.33);
			categoryMap.set(catName, current + monthlyAmount);
		}

		const categoryBreakdown = Array.from(categoryMap.entries()).map(
			([name, amount]) => ({
				name,
				amount,
			}),
		);

		return {
			monthlyTotal,
			yearlyTotal,
			activeCount: activeSubs.length,
			upcomingThisMonth,
			categoryBreakdown,
		};
	},
});

export const getCalendarData = query({
	args: { userId: v.id("users"), year: v.number(), month: v.number() },
	handler: async (ctx, args) => {
		const subs = await ctx.db
			.query("subscriptions")
			.withIndex("by_user", (q) => q.eq("userId", args.userId))
			.collect();

		const activeSubs = subs.filter((s) => s.isActive);
		const calendarItems: Array<{
			date: string;
			subscriptionName: string;
			amount: number;
			color: string;
		}> = [];

		for (const sub of activeSubs) {
			const nextDate = new Date(sub.nextBillingDate);
			if (
				nextDate.getMonth() === args.month &&
				nextDate.getFullYear() === args.year
			) {
				calendarItems.push({
					date: sub.nextBillingDate,
					subscriptionName: sub.name,
					amount: sub.amount,
					color: sub.color ?? "#3b82f6",
				});
			}
		}

		return calendarItems;
	},
});

export const create = mutation({
	args: {
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
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("subscriptions", {
			...args,
			isActive: true,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		});
	},
});

export const update = mutation({
	args: {
		id: v.id("subscriptions"),
		name: v.string(),
		amount: v.number(),
		billingCycle: v.union(
			v.literal("monthly"),
			v.literal("yearly"),
			v.literal("weekly"),
		),
		categoryId: v.id("categories"),
		nextBillingDate: v.string(),
		paymentMethod: v.optional(v.string()),
		memo: v.optional(v.string()),
		color: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...rest } = args;
		await ctx.db.patch(id, { ...rest, updatedAt: Date.now() });
	},
});

export const remove = mutation({
	args: { id: v.id("subscriptions") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});

export const toggleActive = mutation({
	args: { id: v.id("subscriptions") },
	handler: async (ctx, args) => {
		const sub = await ctx.db.get(args.id);
		if (!sub) throw new Error("Subscription not found");
		await ctx.db.patch(args.id, {
			isActive: !sub.isActive,
			updatedAt: Date.now(),
		});
	},
});
