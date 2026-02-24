"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
	const { user, isLoaded } = useUser();
	const createOrUpdate = useMutation(api.users.createOrUpdate);
	const seedCategories = useMutation(api.categories.seed);
	const seedPresets = useMutation(api.servicePresets.seed);

	useEffect(() => {
		if (isLoaded && user) {
			createOrUpdate({
				clerkId: user.id,
				name: user.fullName ?? user.firstName ?? "ユーザー",
				email: user.primaryEmailAddress?.emailAddress ?? "",
				imageUrl: user.imageUrl,
			});
			seedCategories({});
			seedPresets({});
		}
	}, [isLoaded, user, createOrUpdate, seedCategories, seedPresets]);

	return (
		<div className="flex min-h-screen bg-gray-50">
			<div className="hidden md:block">
				<Sidebar />
			</div>
			<main className="flex-1 pb-20 md:pb-0">{children}</main>
			<MobileNav />
		</div>
	);
}
