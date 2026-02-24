import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t bg-gray-50 py-12">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
							サブトク
						</h3>
						<p className="text-sm text-gray-600">
							サブスクリプションの見える化で毎月トクする
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-3">サービス</h4>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<Link href="/about" className="hover:text-blue-600">
									サービスについて
								</Link>
							</li>
							<li>
								<Link href="/help" className="hover:text-blue-600">
									ヘルプセンター
								</Link>
							</li>
							<li>
								<Link href="/status" className="hover:text-blue-600">
									サービスステータス
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-3">法的情報</h4>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<Link href="/terms" className="hover:text-blue-600">
									利用規約
								</Link>
							</li>
							<li>
								<Link href="/privacy" className="hover:text-blue-600">
									プライバシーポリシー
								</Link>
							</li>
							<li>
								<Link href="/legal" className="hover:text-blue-600">
									特定商取引法に基づく表記
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-3">お問い合わせ</h4>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>運営者: 木村太陽</li>
							<li>
								<a
									href="mailto:taiyo.kimura.3w@stu.hosei.ac.jp"
									className="hover:text-blue-600"
								>
									taiyo.kimura.3w@stu.hosei.ac.jp
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
					© {new Date().getFullYear()} サブトク. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
