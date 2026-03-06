import { InfoBlock } from '@/components/shared/info-block'

export default function NotAuthPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-40'>
			<InfoBlock
				title='Access denied'
				text='This page is available only for registered users'
				imageUrl='/lock.png'
			/>
		</div>
	)
}
