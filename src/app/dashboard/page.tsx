"use client";

import { useQuery } from "convex/react";
import type { Metadata } from "next";
import {
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "../../../convex/_generated/api";

const COLORS = [
	"#3b82f6",
	"#8b5cf6",
	"#ef4444",
	"#22c55e",
	"#f59e0b",
	"#06b6d4",
	"#ec4899",
	"#a855f7",
	"#6b7280",
];

export default function DashboardPage() {
	const { user } = useCurrentUser();
	const stats = useQuery(
		api.subscriptions.getDashboardStats,
		user ? { userId: user._id } : "skip",
	);
	const subs = useQuery(
		api.subscriptions.getByUser,
		user ? { userId: user._id } : "skip",
	);

	if (!user || !stats) {
		return (
			<div className="p-6 md:p-8">
				<div className="animate-pulse space-y-4">
					<div className="h-8 w-48 bg-gray-200 rounded" />
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className="h-32 bg-gray-200 rounded-xl" />
						))}
					</div>
				</div>
			</div>
		);
	}

	const upcomingSubs = (subs ?? [])
		.filter((s) => s.isActive)
		.sort(
			(a, b) =>
				new Date(a.nextBillingDate).getTime() -
				new Date(b.nextBillingDate).getTime(),
		)
		.slice(0, 5);

	const chartConfig: Record<string, { label: string; color: string }> = {};
	stats.categoryBreakdown.forEach((cat, i) => {
		chartConfig[cat.name] = {
			label: cat.name,
			color: COLORS[i % COLORS.length],
		};
	});

	return (
		<div className="p-6 md:p-8 space-y-6">
			<h1 className="text-2xl font-bold">ダッシュボード</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-gray-500">月額合計</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-blue-600">
							¥{stats.monthlyTotal.toLocaleString()}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-gray-500">年額合計</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-purple-600">
							¥{stats.yearlyTotal.toLocaleString()}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-gray-500">
							アクティブ数
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-green-600">
							{stats.activeCount}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm text-gray-500">
							今月の支払い
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold text-orange-600">
							{stats.upcomingThisMonth}件
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				{/* Category Pie Chart */}
				<Card>
					<CardHeader>
						<CardTitle>カテゴリ別支出</CardTitle>
					</CardHeader>
					<CardContent>
						{stats.categoryBreakdown.length > 0 ? (
							<ChartContainer config={chartConfig} className="h-[300px] w-full">
								<PieChart>
									<Pie
										data={stats.categoryBreakdown}
										dataKey="amount"
										nameKey="name"
										cx="50%"
										cy="50%"
										outerRadius={100}
										label={({ name, amount }) =>
											`${name}: ¥${amount.toLocaleString()}`
										}
									>
										{stats.categoryBreakdown.map((_, i) => (
											<Cell
												key={`cell-${i}`}
												fill={COLORS[i % COLORS.length]}
											/>
										))}
									</Pie>
									<ChartTooltip content={<ChartTooltipContent />} />
								</PieChart>
							</ChartContainer>
						) : (
							<div className="h-[300px] flex items-center justify-center text-gray-400">
								サブスクを追加するとグラフが表示されます
							</div>
						)}
					</CardContent>
				</Card>

				{/* Upcoming Payments */}
				<Card>
					<CardHeader>
						<CardTitle>直近の支払い予定</CardTitle>
					</CardHeader>
					<CardContent>
						{upcomingSubs.length > 0 ? (
							<div className="space-y-3">
								{upcomingSubs.map((sub) => (
									<div
										key={sub._id}
										className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
									>
										<div className="flex items-center gap-3">
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: sub.color ?? "#3b82f6" }}
											/>
											<div>
												<p className="font-medium text-sm">{sub.name}</p>
												<p className="text-xs text-gray-500">
													{new Date(sub.nextBillingDate).toLocaleDateString(
														"ja-JP",
													)}
												</p>
											</div>
										</div>
										<p className="font-semibold">
											¥{sub.amount.toLocaleString()}
										</p>
									</div>
								))}
							</div>
						) : (
							<div className="h-[200px] flex items-center justify-center text-gray-400">
								支払い予定がありません
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
