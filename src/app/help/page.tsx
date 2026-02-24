import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: "ヘルプセンター",
	description: "サブトクのよくある質問とお問い合わせ先",
};

const faqs = [
	{
		category: "はじめに",
		items: [
			{
				q: "アカウントの作成方法は？",
				a: "トップページの「無料ではじめる」ボタンからメールアドレスまたはGoogleアカウントで登録できます。",
			},
			{
				q: "サブスクの追加方法は？",
				a: "「サブスク一覧」ページの「+ 追加」ボタンから、プリセットのサービスを選ぶか、手動で入力して追加できます。",
			},
			{
				q: "料金はかかりますか？",
				a: "サブトクは完全無料でご利用いただけます。すべての機能を制限なくお使いいただけます。",
			},
		],
	},
	{
		category: "機能について",
		items: [
			{
				q: "対応しているサブスクサービスは？",
				a: "Netflix、Amazon Prime、Spotify、YouTube Premium、U-NEXTなど、日本で人気の20以上のサービスがプリセットされています。プリセットにないサービスも手動で追加できます。",
			},
			{
				q: "カテゴリは変更できますか？",
				a: "プリセットのカテゴリ（動画配信、音楽、ゲームなど）に加えて、カスタムカテゴリを追加できます。",
			},
		],
	},
	{
		category: "技術的な質問",
		items: [
			{
				q: "対応ブラウザは？",
				a: "Chrome、Firefox、Safari、Edgeの最新版に対応しています。スマートフォンのブラウザでもご利用いただけます。",
			},
			{
				q: "データは安全ですか？",
				a: "データはConvexのクラウドデータベースに暗号化して保存されます。認証にはClerkを使用しており、業界標準のセキュリティを確保しています。",
			},
		],
	},
];

export default function HelpPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
				<h1 className="text-3xl font-bold mb-8">ヘルプセンター</h1>

				{faqs.map((section) => (
					<section key={section.category} className="mb-8">
						<h2 className="text-xl font-bold mb-4">{section.category}</h2>
						<div className="space-y-4">
							{section.items.map((faq) => (
								<details
									key={faq.q}
									className="group bg-gray-50 rounded-lg p-4 cursor-pointer"
								>
									<summary className="font-medium text-gray-800 group-open:mb-2">
										{faq.q}
									</summary>
									<p className="text-gray-600 text-sm leading-relaxed">
										{faq.a}
									</p>
								</details>
							))}
						</div>
					</section>
				))}

				<section className="bg-blue-50 rounded-lg p-6">
					<h2 className="text-xl font-bold mb-3">お問い合わせ</h2>
					<p className="text-gray-700 mb-2">
						上記で解決しない場合は、以下のメールアドレスまでお気軽にお問い合わせください。
					</p>
					<a
						href="mailto:taiyo.kimura.3w@stu.hosei.ac.jp"
						className="text-blue-600 hover:underline font-medium"
					>
						taiyo.kimura.3w@stu.hosei.ac.jp
					</a>
				</section>
			</main>
			<Footer />
		</div>
	);
}
