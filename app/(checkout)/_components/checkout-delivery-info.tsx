'use client'

import {
	FormInput,
	FormTextarea,
} from '../../../components/shared/form-components'
import { WhiteBlock } from '../../../components/shared/white-block'

interface Props {
	className?: string
}

export const CheckoutDeliveryInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='3. Delivery address' className={className}>
			<div className='flex flex-col gap-5'>
				<FormInput
					name={'address'}
					className='text-base'
					placeholder='Address'
				/>

				<FormTextarea
					name='comment'
					rows={5}
					className='text-base'
					placeholder='Order comment'
				/>
			</div>
		</WhiteBlock>
	)
}
