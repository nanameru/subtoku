"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
	{ href: "/dashboard", label: "ホーム", icon: "📊" },
	{ href: "/subscriptions", label: "一覧", icon: "📋" },
	{ href: "/calendar", label: "カレンダー", icon: "📅" },
	{ href: "/settings", label: "設定", icon: "⚙️" },
];

export function MobileNav() {
	const pathname = usePathname();

	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
			<div className="flex justify-around py-2">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							"flex flex-col items-center gap-1 px-3 py-1 text-xs",
							pathname === item.href ? "text-blue-600" : "text-gray-500",
						)}
					>
						<span className="text-lg">{item.icon}</span>
						{item.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
