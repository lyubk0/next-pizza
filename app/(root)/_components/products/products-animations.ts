export const productsContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
}

export const productsAnimationVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 20,
			mass: 0.8,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.9,
		transition: {
			type: 'spring',
			stiffness: 500,
			damping: 30,
			duration: 0.2,
		},
	},
}
