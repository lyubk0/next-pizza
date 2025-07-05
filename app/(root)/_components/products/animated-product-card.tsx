import { motion } from 'framer-motion'
import React from 'react'

interface Props {
	children: React.ReactNode
	index: number
}

export const AnimatedProductCard: React.FC<Props> = ({ children, index }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				delay: index * 0.1,
				duration: 0.3,
			}}
		>
			{children}
		</motion.div>
	)
}
