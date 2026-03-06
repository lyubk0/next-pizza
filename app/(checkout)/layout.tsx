import { Container, Header } from '@/components/shared'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
<<<<<<< HEAD
	title: 'Next Pizza | Корзина',
=======
	title: 'Next Pizza | Cart',
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
}

export default function CartLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='min-h-screen bg-[#F4F1EE]'>
			<Suspense>
				{' '}
				<Header
					isShowSearch={false}
					isShowCart={false}
					className='border-b-gray-200'
				/>
			</Suspense>

			<Container>{children}</Container>
		</main>
	)
}
