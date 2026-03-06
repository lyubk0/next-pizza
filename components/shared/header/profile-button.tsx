import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { CircleUser, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	onClickSignIn,
	className,
}) => {
	const { data: session, isPending } = authClient.useSession()

	return (
		<div className={className}>
			{!session ? (
				<Button
					loading={isPending}
					onClick={onClickSignIn}
					variant={isPending ? 'default' : 'outline'}
					className='flex items-center gap-1 w-[95px]'
				>
					<User size={16} />
					Sign in
				</Button>
			) : (
				<Link href='/profile'>
					<Button variant='secondary' className='flex items-center gap-2'>
						<CircleUser size={18} />
						Profile
					</Button>
				</Link>
			)}
		</div>
	)
}
