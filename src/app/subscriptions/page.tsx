"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { SubscriptionDialog } from "@/components/subscription-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export default function SubscriptionsPage() {
	const { user } = useCurrentUser();
	const subs = useQuery(
		api.subscriptions.getByUser,
		user ? { userId: user._id } : "skip",
	);
	const categories = useQuery(
		api.categories.getAll,
		user ? { userId: user._id } : "skip",
	);
	const toggleActive = useMutation(api.subscriptions.toggleActive);
	const removeSub = useMutation(api.subscriptions.remove);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [sortBy, setSortBy] = useState("name");

	if (!user || !subs) {
		return (
			<div className="p-6 md:p-8">
				<div className="animate-pulse space-y-4">
					<div className="h-8 w-48 bg-gray-200 rounded" />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-40 bg-gray-200 rounded-xl" />
						))}
					</div>
				</div>
			</div>
		);
	}

	let filtered = subs.filter((s) =>
		s.name.toLowerCase().includes(search.toLowerCase()),
	);
	if (categoryFilter !== "all") {
		filtered = filtered.filter((s) => s.categoryId === categoryFilter);
	}

	filtered.sort((a, b) => {
		if (sortBy === "amount") return b.amount - a.amount;
		if (sortBy === "date")
			return (
				new Date(a.nextBillingDate).getTime() -
				new Date(b.nextBillingDate).getTime()
			);
		return a.name.localeCompare(b.name, "ja");
	});

	const cycleLabel = (c: string) => {
		if (c === "monthly") return "月額";
		if (c === "yearly") return "年額";
		return "週額";
	};

	return (
		<div className="p-6 md:p-8 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">サブスク一覧</h1>
				<Button
					className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
					onClick={() => setDialogOpen(true)}
				>
					+ 追加
				</Button>
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row gap-3">
				<Input
					placeholder="サービス名で検索..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="sm:max-w-xs"
				/>
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="sm:w-[180px]">
						<SelectValue placeholder="カテゴリ" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">すべて</SelectItem>
						{categories?.map((c) => (
							<SelectItem key={c._id} value={c._id}>
								{c.icon} {c.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className="sm:w-[180px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">名前順</SelectItem>
						<SelectItem value="amount">金額順</SelectItem>
						<SelectItem value="date">請求日順</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Subscriptions Grid */}
			{filtered.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((sub) => (
						<Card
							key={sub._id}
							className={`hover:shadow-lg transition-shadow ${!sub.isActive ? "opacity-60" : ""}`}
						>
							<CardContent className="p-5">
								<div className="flex items-start justify-between mb-3">
									<div className="flex items-center gap-3">
										<div
											className="w-4 h-4 rounded-full flex-shrink-0"
											style={{ backgroundColor: sub.color ?? "#3b82f6" }}
										/>
										<h3 className="font-semibold">{sub.name}</h3>
									</div>
									<Badge variant={sub.isActive ? "default" : "secondary"}>
										{sub.isActive ? "アクティブ" : "停止中"}
									</Badge>
								</div>
								<p className="text-2xl font-bold mb-1">
									¥{sub.amount.toLocaleString()}
									<span className="text-sm font-normal text-gray-500">
										/{cycleLabel(sub.billingCycle)}
									</span>
								</p>
								<p className="text-sm text-gray-500 mb-1">
									次回:{" "}
									{new Date(sub.nextBillingDate).toLocaleDateString("ja-JP")}
								</p>
								{sub.category && (
									<Badge
										variant="outline"
										className="mb-3"
										style={{ borderColor: sub.category.color }}
									>
										{sub.category.icon} {sub.category.name}
									</Badge>
								)}
								<div className="flex gap-2 mt-3">
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											toggleActive({ id: sub._id });
											toast.success(
												sub.isActive ? "停止しました" : "再開しました",
											);
										}}
									>
										{sub.isActive ? "停止" : "再開"}
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="text-red-600 hover:text-red-700"
										onClick={() => {
											removeSub({ id: sub._id });
											toast.success("削除しました");
										}}
									>
										削除
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="text-center py-20">
					<p className="text-5xl mb-4">📋</p>
					<p className="text-lg text-gray-500 mb-4">
						サブスクリプションがありません
					</p>
					<Button
						className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
						onClick={() => setDialogOpen(true)}
					>
						最初の1つを追加しましょう！
					</Button>
				</div>
			)}

			<SubscriptionDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				userId={user._id}
			/>
		</div>
	);
}
