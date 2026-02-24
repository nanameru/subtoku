import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "サービスステータス",
	description: "サブトクのシステム稼働状況",
};

const systems = [
	{
		name: "Webアプリ",
		status: "operational",
		description: "フロントエンド (Vercel)",
	},
	{ name: "API", status: "operational", description: "バックエンド (Convex)" },
	{ name: "認証システム", status: "operational", description: "認証 (Clerk)" },
	{
		name: "データベース",
		status: "operational",
		description: "データ保存 (Convex)",
	},
];

function StatusBadge({ status }: { status: string }) {
	if (status === "operational") {
		return (
			<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
				正常稼働
			</Badge>
		);
	}
	if (status === "degraded") {
		return (
			<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
				一部障害
			</Badge>
		);
	}
	return (
		<Badge className="bg-red-100 text-red-800 hover:bg-red-100">障害発生</Badge>
	);
}

export default function StatusPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
				<h1 className="text-3xl font-bold mb-4">サービスステータス</h1>
				<div className="flex items-center gap-2 mb-8">
					<div className="w-3 h-3 rounded-full bg-green-500" />
					<p className="text-green-700 font-medium">
						すべてのシステムが正常稼働中
					</p>
				</div>

				<div className="space-y-3 mb-12">
					{systems.map((sys) => (
						<Card key={sys.name}>
							<CardContent className="flex items-center justify-between p-4">
								<div>
									<p className="font-medium">{sys.name}</p>
									<p className="text-sm text-gray-500">{sys.description}</p>
								</div>
								<StatusBadge status={sys.status} />
							</CardContent>
						</Card>
					))}
				</div>

				<section>
					<h2 className="text-xl font-bold mb-4">障害履歴</h2>
					<div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
						<p>現在、障害の報告はありません。</p>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
