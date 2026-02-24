"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "../../../convex/_generated/api";

export default function CalendarPage() {
	const { user } = useCurrentUser();
	const [currentDate, setCurrentDate] = useState(new Date());
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const calendarData = useQuery(
		api.subscriptions.getCalendarData,
		user ? { userId: user._id, year, month } : "skip",
	);

	if (!user) {
		return (
			<div className="p-6 md:p-8">
				<div className="animate-pulse h-96 bg-gray-200 rounded-xl" />
			</div>
		);
	}

	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const days: Array<number | null> = [];

	for (let i = 0; i < firstDay; i++) days.push(null);
	for (let i = 1; i <= daysInMonth; i++) days.push(i);

	const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
	const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

	const getSubsForDay = (day: number) => {
		if (!calendarData) return [];
		const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
		return calendarData.filter((item) => item.date === dateStr);
	};

	return (
		<div className="p-6 md:p-8 space-y-6">
			<h1 className="text-2xl font-bold">カレンダー</h1>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<Button variant="outline" size="sm" onClick={prevMonth}>
							← 前月
						</Button>
						<CardTitle>
							{year}年{month + 1}月
						</CardTitle>
						<Button variant="outline" size="sm" onClick={nextMonth}>
							翌月 →
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-7 gap-1">
						{["日", "月", "火", "水", "木", "金", "土"].map((d) => (
							<div
								key={d}
								className="text-center text-sm font-medium text-gray-500 py-2"
							>
								{d}
							</div>
						))}
						{days.map((day, i) => {
							const subsForDay = day ? getSubsForDay(day) : [];
							const totalForDay = subsForDay.reduce(
								(sum, s) => sum + s.amount,
								0,
							);
							return (
								<div
									key={i}
									className={`min-h-[80px] p-1 border rounded-lg ${
										day ? "bg-white hover:bg-gray-50" : "bg-gray-50"
									}`}
								>
									{day && (
										<>
											<span className="text-sm text-gray-700">{day}</span>
											<div className="space-y-0.5 mt-1">
												{subsForDay.map((sub, j) => (
													<div
														key={j}
														className="text-xs px-1 py-0.5 rounded truncate"
														style={{
															backgroundColor: `${sub.color}20`,
															color: sub.color,
														}}
													>
														{sub.subscriptionName}
													</div>
												))}
												{totalForDay > 0 && (
													<div className="text-xs font-semibold text-gray-600 mt-1">
														¥{totalForDay.toLocaleString()}
													</div>
												)}
											</div>
										</>
									)}
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
