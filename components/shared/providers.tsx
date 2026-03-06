'use client'

import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<>
			{children}
			<Toaster
				reverseOrder={false}
				toastOptions={{
					style: {
						borderRadius: '99px',
						border: 'none',
						background: 'white',
						backgroundColor: 'white',
						boxShadow: `
            0 0 15px rgba(0, 0, 0, 0.031),
            0 2px 30px rgba(0, 0, 0, 0.078),
            0 0 1px rgba(0, 0, 0, 0.302)
          `,
						fontWeight: '500',
					},
				}}
			/>
			<NextTopLoader />
		</>
	)
}
