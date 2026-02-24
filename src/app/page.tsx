import Link from "next/link";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
				<div className="container mx-auto px-4 h-16 flex items-center justify-between">
					<Link
						href="/"
						className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
					>
						サブトク
					</Link>
					<div className="flex gap-3">
						<Link href="/sign-in">
							<Button variant="ghost">ログイン</Button>
						</Link>
						<Link href="/sign-up">
							<Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
								無料ではじめる
							</Button>
						</Link>
					</div>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero */}
				<section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-24 md:py-32">
					<div className="container mx-auto px-4 text-center relative z-10">
						<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
							サブスクの
							<span className="text-yellow-300">&quot;見える化&quot;</span>で、
							<br />
							ムダをなくそう
						</h1>
						<p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
							Netflix、Spotify、Amazon Prime... あなたのサブスク、全部でいくら？
							サブトクで簡単に管理して、毎月トクしましょう。
						</p>
						<Link href="/sign-up">
							<Button
								size="lg"
								className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6 rounded-xl shadow-lg"
							>
								無料ではじめる →
							</Button>
						</Link>
						<p className="mt-4 text-sm text-blue-200">
							クレジットカード不要・ずっと無料
						</p>
					</div>
					<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
				</section>

				{/* Features */}
				<section className="py-20 bg-gray-50">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">
							サブトクの<span className="text-blue-600">3つの特徴</span>
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="p-8 text-center">
									<div className="text-5xl mb-4">📋</div>
									<h3 className="text-xl font-bold mb-3">かんたん一覧管理</h3>
									<p className="text-gray-600">
										日本の人気サービスがプリセット済み。
										タップするだけでサブスクを追加できます。
									</p>
								</CardContent>
							</Card>
							<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="p-8 text-center">
									<div className="text-5xl mb-4">📊</div>
									<h3 className="text-xl font-bold mb-3">支出をグラフで分析</h3>
									<p className="text-gray-600">
										月額・年額の合計、カテゴリ別の内訳を
										見やすいグラフで可視化します。
									</p>
								</CardContent>
							</Card>
							<Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
								<CardContent className="p-8 text-center">
									<div className="text-5xl mb-4">📅</div>
									<h3 className="text-xl font-bold mb-3">
										カレンダーで支払日確認
									</h3>
									<p className="text-gray-600">
										いつ、いくら支払うのかが一目瞭然。 支払い忘れを防ぎます。
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* How it works */}
				<section className="py-20">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-12">
							かんたん<span className="text-purple-600">3ステップ</span>
						</h2>
						<div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
							{[
								{
									step: "1",
									title: "無料登録",
									desc: "メールアドレスだけでOK",
								},
								{
									step: "2",
									title: "サブスクを追加",
									desc: "プリセットから選ぶだけ",
								},
								{
									step: "3",
									title: "支出を見える化",
									desc: "ダッシュボードで確認",
								},
							].map((item) => (
								<div key={item.step} className="flex flex-col items-center">
									<div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold flex items-center justify-center mb-4">
										{item.step}
									</div>
									<h3 className="text-lg font-bold mb-2">{item.title}</h3>
									<p className="text-gray-600">{item.desc}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-4">今すぐはじめよう</h2>
						<p className="text-blue-100 mb-8">
							完全無料で、すべての機能が使えます
						</p>
						<Link href="/sign-up">
							<Button
								size="lg"
								className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8"
							>
								無料ではじめる
							</Button>
						</Link>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
