"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
	return (
		<div className="p-6 md:p-8 space-y-6">
			<h1 className="text-2xl font-bold">設定</h1>
			<UserProfile
				appearance={{
					elements: {
						rootBox: "w-full",
						card: "shadow-none border rounded-xl",
					},
				}}
			/>
		</div>
	);
}
