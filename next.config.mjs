import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: { ignoreBuildErrors: true },
	webpack: (config, { isServer }) => {
		config.resolve.alias["@"] = path.resolve(
			new URL(".", import.meta.url).pathname,
			"app"
		);
		config.resolve.alias["~"] = path.resolve(
			new URL(".", import.meta.url).pathname,
			"app/component"
		);

		// サーバーサイドでのみ必要な設定の場合
		if (isServer) {
			// ここにサーバーサイドの設定を追加
		}

		return config;
	},
};

export default nextConfig;
