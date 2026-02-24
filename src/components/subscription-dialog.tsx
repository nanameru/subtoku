"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

interface SubscriptionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	userId: Id<"users">;
	editData?: {
		_id: Id<"subscriptions">;
		name: string;
		amount: number;
		billingCycle: "monthly" | "yearly" | "weekly";
		categoryId: Id<"categories">;
		nextBillingDate: string;
		paymentMethod?: string;
		memo?: string;
		color?: string;
	};
}

export function SubscriptionDialog({
	open,
	onOpenChange,
	userId,
	editData,
}: SubscriptionDialogProps) {
	const categories = useQuery(api.categories.getAll, { userId });
	const presets = useQuery(api.servicePresets.getAll);
	const createSub = useMutation(api.subscriptions.create);
	const updateSub = useMutation(api.subscriptions.update);

	const [name, setName] = useState(editData?.name ?? "");
	const [amount, setAmount] = useState(editData?.amount?.toString() ?? "");
	const [billingCycle, setBillingCycle] = useState<
		"monthly" | "yearly" | "weekly"
	>(editData?.billingCycle ?? "monthly");
	const [categoryId, setCategoryId] = useState<string>(
		editData?.categoryId ?? "",
	);
	const [nextBillingDate, setNextBillingDate] = useState(
		editData?.nextBillingDate ?? new Date().toISOString().split("T")[0],
	);
	const [paymentMethod, setPaymentMethod] = useState(
		editData?.paymentMethod ?? "",
	);
	const [memo, setMemo] = useState(editData?.memo ?? "");
	const [color, setColor] = useState(editData?.color ?? "#3b82f6");
	const [loading, setLoading] = useState(false);

	const handlePresetSelect = (presetName: string) => {
		const preset = presets?.find((p) => p.name === presetName);
		if (!preset) return;
		setName(preset.nameJa);
		if (preset.defaultAmount) setAmount(preset.defaultAmount.toString());
		setBillingCycle(preset.defaultCycle);
		setColor(preset.color);
		// Try to match category
		const cat = categories?.find((c) => c.name === preset.categoryName);
		if (cat) setCategoryId(cat._id);
	};

	const handleSubmit = async () => {
		if (!name || !amount || !categoryId) {
			toast.error("必須項目を入力してください");
			return;
		}

		setLoading(true);
		try {
			if (editData) {
				await updateSub({
					id: editData._id,
					name,
					amount: Number(amount),
					billingCycle,
					categoryId: categoryId as Id<"categories">,
					nextBillingDate,
					paymentMethod: paymentMethod || undefined,
					memo: memo || undefined,
					color,
				});
				toast.success("サブスクリプションを更新しました");
			} else {
				await createSub({
					userId,
					name,
					amount: Number(amount),
					currency: "JPY",
					billingCycle,
					categoryId: categoryId as Id<"categories">,
					startDate: new Date().toISOString().split("T")[0],
					nextBillingDate,
					paymentMethod: paymentMethod || undefined,
					memo: memo || undefined,
					color,
				});
				toast.success("サブスクリプションを追加しました");
			}
			onOpenChange(false);
			// Reset
			setName("");
			setAmount("");
			setCategoryId("");
			setMemo("");
		} catch {
			toast.error("エラーが発生しました");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						{editData ? "サブスクリプションを編集" : "サブスクリプションを追加"}
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{/* Preset selector */}
					{!editData && presets && presets.length > 0 && (
						<div>
							<Label>プリセットから選ぶ</Label>
							<Select onValueChange={handlePresetSelect}>
								<SelectTrigger>
									<SelectValue placeholder="サービスを選択..." />
								</SelectTrigger>
								<SelectContent>
									{presets.map((p) => (
										<SelectItem key={p._id} value={p.name}>
											{p.nameJa}
											{p.defaultAmount
												? ` (¥${p.defaultAmount.toLocaleString()}/月)`
												: ""}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}

					<div>
						<Label htmlFor="name">サービス名 *</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="例: Netflix"
						/>
					</div>

					<div>
						<Label htmlFor="amount">金額（円） *</Label>
						<Input
							id="amount"
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="例: 990"
						/>
					</div>

					<div>
						<Label>請求サイクル</Label>
						<Select
							value={billingCycle}
							onValueChange={(v) =>
								setBillingCycle(v as "monthly" | "yearly" | "weekly")
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="monthly">月額</SelectItem>
								<SelectItem value="yearly">年額</SelectItem>
								<SelectItem value="weekly">週額</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>カテゴリ *</Label>
						<Select value={categoryId} onValueChange={setCategoryId}>
							<SelectTrigger>
								<SelectValue placeholder="カテゴリを選択..." />
							</SelectTrigger>
							<SelectContent>
								{categories?.map((c) => (
									<SelectItem key={c._id} value={c._id}>
										{c.icon} {c.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="nextBillingDate">次回請求日</Label>
						<Input
							id="nextBillingDate"
							type="date"
							value={nextBillingDate}
							onChange={(e) => setNextBillingDate(e.target.value)}
						/>
					</div>

					<div>
						<Label>支払い方法</Label>
						<Select value={paymentMethod} onValueChange={setPaymentMethod}>
							<SelectTrigger>
								<SelectValue placeholder="選択してください" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="credit_card">クレジットカード</SelectItem>
								<SelectItem value="bank_transfer">銀行引落し</SelectItem>
								<SelectItem value="paypay">PayPay</SelectItem>
								<SelectItem value="convenience">コンビニ払い</SelectItem>
								<SelectItem value="other">その他</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="color">カラー</Label>
						<Input
							id="color"
							type="color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
							className="h-10 w-20"
						/>
					</div>

					<div>
						<Label htmlFor="memo">メモ</Label>
						<Input
							id="memo"
							value={memo}
							onChange={(e) => setMemo(e.target.value)}
							placeholder="任意のメモ"
						/>
					</div>

					<Button
						className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? "処理中..." : editData ? "更新する" : "追加する"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
