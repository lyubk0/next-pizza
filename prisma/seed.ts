import { prisma } from './prisma-client'
const ingredients = [
	{
		name: 'Cheese-stuffed crust',
		price: 18,
		imageUrl: '/ingredients/1.png',
	},
	{
		name: 'Creamy mozzarella',
		price: 8,
		imageUrl: '/ingredients/2.png',
	},
	{
		name: 'Cheddar and Parmesan cheeses',
		price: 8,
		imageUrl: '/ingredients/16.png',
	},
	{
		name: 'Spicy jalapeño pepper',
		price: 6,
		imageUrl: '/ingredients/3.png',
	},
	{
		name: 'Tender chicken',
		price: 8,
		imageUrl: '/ingredients/14.png',
	},
	{
		name: 'Mushrooms',
		price: 6,
		imageUrl: '/ingredients/4.png',
	},
	{
		name: 'Ham',
		price: 8,
		imageUrl: '/ingredients/13.png',
	},
	{
		name: 'Spicy pepperoni',
		price: 8,
		imageUrl: '/ingredients/12.png',
	},
	{
		name: 'Spicy chorizo',
		price: 8,
		imageUrl: '/ingredients/8.png',
	},
	{
		name: 'Pickles',
		price: 6,
		imageUrl: '/ingredients/17.png',
	},
	{
		name: 'Fresh tomatoes',
		price: 6,
		imageUrl: '/ingredients/18.png',
	},
	{
		name: 'Red onion',
		price: 6,
		imageUrl: '/ingredients/19.png',
	},
	{
		name: 'Juicy pineapple',
		price: 6,
		imageUrl: '/ingredients/20.png',
	},
	{
		name: 'Italian herbs',
		price: 4,
		imageUrl: '/ingredients/21.png',
	},
	{
		name: 'Bell pepper',
		price: 6,
		imageUrl: '/ingredients/22.png',
	},
	{
		name: 'Feta cubes',
		price: 8,
		imageUrl: '/ingredients/23.png',
	},
	{
		name: 'Meatballs',
		price: 8,
		imageUrl: '/ingredients/24.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }))

const products = [
	{
		name: 'Omelet with ham and mushrooms',
		description:
			'Hot hearty omelet with a golden crust, ham, mushrooms and mozzarella',
		imageUrl: '/products/omlet-with-ham-and-mashroom.png',
		categoryId: 2,
		price: 10,
	},
	{
		name: 'Omelet with bacon',
		description:
			'Hearty and balanced breakfast — omelet with a golden crust, spicy pepperoni, tomatoes and mozzarella',
		imageUrl: '/products/omlet-with-beacon.png',
		categoryId: 2,
		price: 10,
	},
	{
		name: 'Cheesecakes with condensed milk',
		description:
			'Tender cheesecakes baked in the oven, served with a portion of condensed milk',
		imageUrl: '/products/cheesecakes.png',
		categoryId: 2,
		price: 10,
	},
	{
		name: 'Caffè latte',
		description:
			'When you want gentle milk foam, the classic latte comes to the rescue',
		imageUrl: '/products/coffe-latte.png',
		categoryId: 2,
		price: 4,
	},
	{
		name: 'Cappuccino',
		description:
			'The king of coffee drinks — classic cappuccino. For lovers of a balanced coffee-and-milk taste',
		imageUrl: '/products/coffe-cappuccino.png',
		categoryId: 2,
		price: 4,
	},
	{
		name: 'Americano',
		description:
			"A couple of sips of hot Americano, and you'll be ready to conquer the day",
		imageUrl: '/products/coffe-americano.png',
		categoryId: 2,
		price: 4,
	},
	{
		name: 'Chicken nuggets',
		description: 'Tender chicken meat in a crispy breading',
		imageUrl: '/products/chicken-nuggets.png',
		categoryId: 3,
		price: 14,
	},
	{
		name: 'Oven-baked potatoes with sauce 🌱',
		description:
			'Oven-baked potatoes with fragrant spices. Served with cheese sauce',
		imageUrl: '/products/kartofel-s-sousom.png',
		categoryId: 3,
		price: 17,
	},
	{
		name: 'Oven-baked potatoes 🌱👶',
		description:
			'Oven-baked potatoes — familiar taste with little oil. Contains fragrant spices',
		imageUrl: '/products/kartofel.png',
		categoryId: 3,
		price: 14,
	},
	{
		name: 'BBQ chicken wings',
		description: 'Chicken wings with spices and a smoky aroma',
		imageUrl: '/products/chiken-bbq.png',
		categoryId: 3,
		price: 21,
	},
	{
		name: 'Coca-Cola',
		imageUrl: '/products/coca-cola.png',
		categoryId: 4,
		price: 5,
	},
	{
		name: 'Sprite',
		imageUrl: '/products/sprite.png',
		categoryId: 4,
		price: 5,
	},
	{
		name: 'Fanta',
		imageUrl: '/products/fanta.png',
		categoryId: 4,
		price: 5,
	},
	{
		name: 'Zhyvchyk',
		imageUrl: '/products/zivchik.png',
		categoryId: 4,
		price: 5,
	},
]
async function up() {
	await prisma.category.createMany({
		data: [
			{ name: 'Pizzas' },
			{ name: 'Breakfast' },
			{ name: 'Snacks' },
			{ name: 'Drinks' },
		],
	})

	await prisma.ingredient.createMany({
		data: ingredients,
	})

	await prisma.product.createMany({
		data: products,
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Pepperoni Fresh',
			imageUrl: '/pizzas/pepperoni-fresh.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
			price: 10,
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Cheese',
			imageUrl: '/pizzas/cheese.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 18),
			},
			price: 10,
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Chorizo Fresh',
			imageUrl: '/pizzas/chorizo-fresh.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 10),
			},
			price: 10,
		},
	})

	const pizza4 = await prisma.product.create({
		data: {
			name: 'Double Chicken 👶',
			imageUrl: '/pizzas/double-chiken.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 10),
			},
			price: 10,
		},
	})

	const pizza5 = await prisma.product.create({
		data: {
			name: 'Ham and Cheese',
			imageUrl: '/pizzas/ham-and-cheese.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 15),
			},
			price: 10,
		},
	})

	const pizza6 = await prisma.product.create({
		data: {
			name: 'Diablo 🌶️🌶️',
			imageUrl: '/pizzas/diablo.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(7, 17),
			},
			price: 10,
		},
	})

	const pizza7 = await prisma.product.create({
		data: {
			name: 'Four Seasons',
			imageUrl: '/pizzas/four-seasons.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 8),
			},
			price: 10,
		},
	})

	const pizza8 = await prisma.product.create({
		data: {
			name: 'Margherita 🌱',
			imageUrl: '/pizzas/margarita.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 8),
			},
			price: 10,
		},
	})

	const pizza9 = await prisma.product.create({
		data: {
			name: 'BBQ Chicken',
			imageUrl: '/pizzas/chicken-bbq.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 18),
			},
			price: 10,
		},
	})

	await prisma.variation.createMany({
		data: [
			// Pepperoni
			{
				productId: pizza1.id,
				size: 25,
				pizzaType: 1,
				price: 22,
			},

			{
				productId: pizza1.id,
				size: 30,
				pizzaType: 2,
				price: 24,
			},

			{
				productId: pizza1.id,
				size: 40,
				pizzaType: 2,
				price: 26,
			},

			// Cheese

			{
				productId: pizza2.id,
				size: 25,
				pizzaType: 1,
				price: 12,
			},
			{
				productId: pizza2.id,
				size: 30,
				pizzaType: 1,
				price: 15,
			},
			{
				productId: pizza2.id,
				size: 40,
				pizzaType: 1,
				price: 18,
			},

			{
				productId: pizza2.id,
				size: 25,
				pizzaType: 2,
				price: 12,
			},
			{
				productId: pizza2.id,
				size: 30,
				pizzaType: 2,
				price: 18,
			},

			{
				productId: pizza2.id,
				size: 40,
				pizzaType: 2,
				price: 16,
			},

			// Chorizo

			{
				productId: pizza3.id,
				size: 30,
				pizzaType: 1,
				price: 22,
			},
			{
				productId: pizza3.id,
				size: 40,
				pizzaType: 1,
				price: 24,
			},

			{
				productId: pizza3.id,
				size: 25,
				pizzaType: 2,
				price: 25,
			},
			{
				productId: pizza3.id,
				size: 30,
				pizzaType: 2,
				price: 28,
			},

			{
				productId: pizza3.id,
				size: 40,
				pizzaType: 2,
				price: 30,
			},

			// Double chiken
			{
				productId: pizza4.id,
				size: 30,
				pizzaType: 1,
				price: 22,
			},
			{
				productId: pizza4.id,
				size: 40,
				pizzaType: 1,
				price: 24,
			},

			{
				productId: pizza4.id,
				size: 25,
				pizzaType: 2,
				price: 25,
			},
			{
				productId: pizza4.id,
				size: 30,
				pizzaType: 2,
				price: 28,
			},

			{
				productId: pizza4.id,
				size: 40,
				pizzaType: 2,
				price: 28,
			},

			// Ham and cheese
			{
				productId: pizza5.id,
				size: 30,
				pizzaType: 1,
				price: 30,
			},
			{
				productId: pizza5.id,
				size: 40,
				pizzaType: 1,
				price: 32,
			},

			{
				productId: pizza6.id,
				size: 25,
				pizzaType: 1,
				price: 15,
			},
			{
				productId: pizza6.id,
				size: 30,
				pizzaType: 1,
				price: 18,
			},
			{
				productId: pizza6.id,
				size: 40,
				pizzaType: 1,
				price: 21,
			},
			{
				productId: pizza6.id,
				size: 25,
				pizzaType: 2,
				price: 16,
			},
			{
				productId: pizza6.id,
				size: 30,
				pizzaType: 2,
				price: 19,
			},
			{
				productId: pizza6.id,
				size: 40,
				pizzaType: 2,
				price: 22,
			},

			// BBQ Chicken
			{
				productId: pizza7.id,
				size: 30,
				pizzaType: 1,
				price: 25,
			},
			{
				productId: pizza7.id,
				size: 40,
				pizzaType: 1,
				price: 27,
			},
			{
				productId: pizza7.id,
				size: 25,
				pizzaType: 2,
				price: 27,
			},
			{
				productId: pizza7.id,
				size: 30,
				pizzaType: 2,
				price: 30,
			},
			{
				productId: pizza7.id,
				size: 40,
				pizzaType: 2,
				price: 33,
			},

			// Veggie Supreme
			{
				productId: pizza8.id,
				size: 25,
				pizzaType: 1,
				price: 18,
			},
			{
				productId: pizza8.id,
				size: 30,
				pizzaType: 1,
				price: 21,
			},
			{
				productId: pizza8.id,
				size: 40,
				pizzaType: 1,
				price: 24,
			},
			{
				productId: pizza8.id,
				size: 25,
				pizzaType: 2,
				price: 19,
			},
			{
				productId: pizza8.id,
				size: 30,
				pizzaType: 2,
				price: 22,
			},
			{
				productId: pizza8.id,
				size: 40,
				pizzaType: 2,
				price: 25,
			},

			// Four Cheese
			{
				productId: pizza9.id,
				size: 30,
				pizzaType: 1,
				price: 28,
			},
			{
				productId: pizza9.id,
				size: 40,
				pizzaType: 1,
				price: 31,
			},
			{
				productId: pizza9.id,
				size: 25,
				pizzaType: 2,
				price: 29,
			},
			{
				productId: pizza9.id,
				size: 30,
				pizzaType: 2,
				price: 32,
			},
			{
				productId: pizza9.id,
				size: 40,
				pizzaType: 2,
				price: 35,
			},

			// Other products

			// Breakfast
			{ productId: 1, price: 13 },
			{ productId: 2, price: 10 },
			{ productId: 3, price: 10 },
			{ productId: 4, price: 4 },
			{ productId: 5, price: 4 },
			{ productId: 6, price: 4 },
			{ productId: 7, price: 21 },
			{ productId: 8, price: 17 },
			{ productId: 9, price: 14 },
			{ productId: 10, price: 17 },

			{ productId: 11, price: 5 },
			{ productId: 12, price: 5 },
			{ productId: 13, price: 5 },
			{ productId: 14, price: 5 },
		],
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Variation" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (error) {
		console.log(error)
	}
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
