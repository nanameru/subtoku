import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: "特定商取引法に基づく表記",
	description: "サブトクの特定商取引法に基づく表記",
};

export default function LegalPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
				<h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>

				<div className="bg-gray-50 rounded-lg p-6">
					<table className="w-full">
						<tbody className="divide-y">
							{[
								["販売業者", "木村太陽"],
								["運営責任者", "木村太陽"],
								["所在地", "神奈川県藤沢市藤沢本町"],
								["連絡先", "taiyo.kimura.3w@stu.hosei.ac.jp"],
								[
									"販売価格",
									"無料（将来的に有料プランを追加する可能性があります）",
								],
								["支払方法", "現在は無料のため該当なし"],
								["支払時期", "現在は無料のため該当なし"],
								[
									"サービス提供時期",
									"アカウント登録完了後、直ちにご利用いただけます",
								],
								[
									"返品・返金",
									"デジタルサービスのため、返品はお受けしておりません。有料プラン導入時は別途定めます",
								],
								[
									"動作環境",
									"Chrome、Firefox、Safari、Edgeの最新版。インターネット接続が必要です",
								],
								[
									"瑕疵担保責任",
									"サービスに瑕疵があった場合は、速やかに修正対応いたします",
								],
							].map(([key, value]) => (
								<tr key={key}>
									<td className="py-3 pr-4 font-semibold text-gray-700 w-40 align-top">
										{key}
									</td>
									<td className="py-3 text-gray-600">{value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
			<Footer />
		</div>
	);
}
