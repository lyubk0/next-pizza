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
			<Title text='Page not found' size='lg' className='mb-4 text-center' />
			<p className='text-neutral-600 mb-6 text-center'>
				Sorry, the page you are looking for does not exist or has been moved.
			</p>
			<Link
				href='/'
				className='bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors'
			>
				Back to homepage
			</Link>
		</Container>
	)
}
