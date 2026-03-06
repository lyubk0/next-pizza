/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['localhost'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})
		return config
	},
<<<<<<< HEAD
=======
	turbopack: {},
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
}

export default nextConfig
