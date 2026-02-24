import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	variable: "--font-noto-sans-jp",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "サブトク - サブスク管理アプリ",
		template: "%s | サブトク",
	},
	description:
		"サブスクリプションの見える化で毎月トクする。日本人のためのサブスク管理Webアプリ。月額・年額の定額サービスを一覧管理し、支出を分析できます。",
	keywords: [
		"サブスク管理",
		"サブスクリプション",
		"固定費管理",
		"節約",
		"支出管理",
		"サブスク見える化",
		"定額サービス管理",
	],
	openGraph: {
		locale: "ja_JP",
		type: "website",
		title: "サブトク - サブスク管理アプリ",
		description: "サブスクリプションの見える化で毎月トクする",
		siteName: "サブトク",
	},
	twitter: {
		card: "summary_large_image",
		title: "サブトク - サブスク管理アプリ",
		description: "サブスクリプションの見える化で毎月トクする",
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" className={notoSansJP.variable}>
			<body className="font-sans antialiased">
				<ConvexClientProvider>
					{children}
					<Toaster />
				</ConvexClientProvider>
			</body>
		</html>
	);
}
