"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "/dashboard", label: "ダッシュボード", icon: "📊" },
	{ href: "/subscriptions", label: "サブスク一覧", icon: "📋" },
	{ href: "/calendar", label: "カレンダー", icon: "📅" },
	{ href: "/settings", label: "設定", icon: "⚙️" },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white border-r min-h-screen flex flex-col">
			<div className="p-6 border-b">
				<Link
					href="/dashboard"
					className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
				>
					サブトク
				</Link>
			</div>
			<nav className="flex-1 p-4 space-y-1">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							"flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
							pathname === item.href
								? "bg-blue-50 text-blue-700"
								: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
						)}
					>
						<span className="text-lg">{item.icon}</span>
						{item.label}
					</Link>
				))}
			</nav>
			<div className="p-4 border-t">
				<div className="flex items-center gap-3 px-4">
					<UserButton afterSignOutUrl="/" />
					<span className="text-sm text-gray-600">アカウント</span>
				</div>
			</div>
		</aside>
	);
}
