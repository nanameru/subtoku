import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: "プライバシーポリシー",
	description: "サブトクのプライバシーポリシー",
};

export default function PrivacyPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto px-4 py-12 max-w-3xl prose prose-gray">
				<h1>プライバシーポリシー</h1>
				<p className="text-sm text-gray-500">最終更新日: 2025年6月24日</p>

				<h2>1. 収集する情報</h2>
				<ul>
					<li>
						<strong>アカウント情報</strong>:
						メールアドレス、氏名、プロフィール画像（Clerk経由）
					</li>
					<li>
						<strong>サービス利用データ</strong>:
						登録したサブスクリプション情報、カテゴリ設定
					</li>
					<li>
						<strong>技術情報</strong>: IPアドレス、ブラウザ種類、アクセス日時
					</li>
				</ul>

				<h2>2. 利用目的</h2>
				<ul>
					<li>本サービスの提供・運営・改善</li>
					<li>ユーザーサポートへの対応</li>
					<li>利用状況の分析</li>
				</ul>

				<h2>3. 第三者サービス</h2>
				<p>本サービスでは以下の第三者サービスを利用しています：</p>
				<ul>
					<li>
						<strong>Clerk</strong>（認証）: ユーザー認証情報の管理
					</li>
					<li>
						<strong>Convex</strong>（データベース）: ユーザーデータの保存
					</li>
					<li>
						<strong>Vercel</strong>（ホスティング）: Webアプリケーションの配信
					</li>
				</ul>

				<h2>4. データ保持期間</h2>
				<p>
					ユーザーデータは、アカウントが有効な間保持されます。アカウント削除時にはすべてのデータを削除します。
				</p>

				<h2>5. セキュリティ</h2>
				<p>
					適切な技術的・組織的措置を講じてデータを保護しています。ただし、インターネット上の通信において完全なセキュリティを保証することはできません。
				</p>

				<h2>6. お客様の権利</h2>
				<p>ユーザーは、自身のデータに関して以下の権利を有します：</p>
				<ul>
					<li>データへのアクセス権</li>
					<li>データの訂正権</li>
					<li>データの削除権</li>
					<li>データの利用制限権</li>
				</ul>

				<h2>7. Cookie</h2>
				<p>
					本サービスでは、認証およびセッション管理のためにCookieを使用しています。
				</p>

				<h2>8. 未成年者について</h2>
				<p>本サービスは、13歳未満のお子様を対象としていません。</p>

				<h2>9. ポリシーの変更</h2>
				<p>
					本ポリシーは必要に応じて変更されることがあります。重要な変更がある場合は、本サービス上で通知します。
				</p>

				<h2>10. お問い合わせ</h2>
				<p>
					メール:{" "}
					<a href="mailto:taiyo.kimura.3w@stu.hosei.ac.jp">
						taiyo.kimura.3w@stu.hosei.ac.jp
					</a>
				</p>
			</main>
			<Footer />
		</div>
	);
}
