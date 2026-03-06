import React from 'react'
import { FormInput } from '../../../components/shared/form-components'
import { WhiteBlock } from '../../../components/shared/white-block'

interface Props {
	className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='2. Personal information' className={className}>
			<div className='flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5'>
				<FormInput
					name='firstName'
					className='text-base'
					placeholder='First name'
				/>
				<FormInput
					name='lastName'
					className='text-base'
					placeholder='Last name'
				/>
				<FormInput name='email' className='text-base' placeholder='E-Mail' />
				<FormInput name='phone' className='text-base' placeholder='Phone' />
			</div>
		</WhiteBlock>
	)
}
