import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: "サービスについて",
	description: "サブトクのミッション、主な特徴、運営者情報について",
};

export default function AboutPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
				<h1 className="text-3xl font-bold mb-8">サービスについて</h1>

				<section className="mb-8">
					<h2 className="text-xl font-bold mb-4">ミッション</h2>
					<p className="text-gray-700 leading-relaxed">
						サブトクは「すべての人のサブスク管理をシンプルに」をミッションに、
						日本人のためのサブスクリプション管理Webアプリを提供しています。
						増え続けるサブスクの支出を見える化し、
						無駄な出費を減らすお手伝いをします。
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-xl font-bold mb-4">主な特徴</h2>
					<ul className="space-y-3 text-gray-700">
						<li className="flex items-start gap-3">
							<span className="text-xl">📋</span>
							<div>
								<strong>かんたん一覧管理</strong> —
								日本の人気サービスがプリセット済み。タップするだけでサブスクを追加できます。
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-xl">📊</span>
							<div>
								<strong>支出をグラフで分析</strong> —
								月額・年額の合計、カテゴリ別の内訳を見やすいグラフで可視化します。
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-xl">📅</span>
							<div>
								<strong>カレンダーで支払日確認</strong> —
								いつ、いくら支払うのかが一目瞭然。支払い忘れを防ぎます。
							</div>
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold mb-4">運営者情報</h2>
					<div className="bg-gray-50 rounded-lg p-6">
						<dl className="space-y-2 text-gray-700">
							<div className="flex gap-4">
								<dt className="font-semibold w-24">運営者</dt>
								<dd>木村太陽</dd>
							</div>
							<div className="flex gap-4">
								<dt className="font-semibold w-24">所在地</dt>
								<dd>神奈川県藤沢市藤沢本町</dd>
							</div>
							<div className="flex gap-4">
								<dt className="font-semibold w-24">メール</dt>
								<dd>
									<a
										href="mailto:taiyo.kimura.3w@stu.hosei.ac.jp"
										className="text-blue-600 hover:underline"
									>
										taiyo.kimura.3w@stu.hosei.ac.jp
									</a>
								</dd>
							</div>
						</dl>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
