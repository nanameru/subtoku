"use client";

import { jaJP } from "@clerk/localizations";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";

const convex = new ConvexReactClient(
	process.env.NEXT_PUBLIC_CONVEX_URL as string,
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider
			localization={jaJP}
			signInUrl="/sign-in"
			signUpUrl="/sign-up"
			afterSignOutUrl="/"
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
