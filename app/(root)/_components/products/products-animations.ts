import { Variants } from 'framer-motion'

export const productsContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
}

export const productsAnimationVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 25,
			mass: 0.5,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.7,
		y: -20,
		transition: {
			duration: 0.1, // Еще быстрее
			ease: 'easeIn',
		},
	},
}
