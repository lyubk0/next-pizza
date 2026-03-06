'use client'

import { Container, Title } from '@/components/shared'
import Image from 'next/image'
import Link from 'next/link'

export default function RootNotFound() {
	return (
		<Container className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)]'>
			<Image
				src='/not-found.png'
				width={300}
				height={300}
				alt='Page not found'
				className='mb-8'
			/>
			<Title
<<<<<<< HEAD
				text='Сторінку не знайдено'
=======
				text='Page not found'
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
				size='lg'
				className='mb-4 text-center'
			/>
			<p className='text-neutral-600 mb-6 text-center'>
<<<<<<< HEAD
				Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена
=======
				Sorry, the page you are looking for does not exist or has been moved.
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
			</p>
			<Link
				href='/'
				className='bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors'
			>
<<<<<<< HEAD
				Повернутися на головну
=======
				Back to homepage
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
			</Link>
		</Container>
	)
}
