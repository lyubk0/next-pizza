import { Ingredient, Variation } from "@prisma/client";

/**
<<<<<<< HEAD
 * Функція для підрахунку загальної вартості піци
 * @param items - варіанти піци
 * @param size - розмір піци
 * @param type - тип тіста піци
 * @param ingredients - інгредієти піци
 * @param addedIngredients - інгредієти, які були додані до піци
 * @returns загальна ціна піци
=======
 * Function for calculating the total pizza cost
 * @param items - pizza variations
 * @param size - pizza size
 * @param type - pizza dough type
 * @param ingredients - pizza ingredients
 * @param addedIngredients - ingredients added to the pizza
 * @returns total pizza price
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
 */

export const calcPizzaPrice = (
  items: Variation[],
  size: number,
  type: number,
  ingredients: Ingredient[],
  addedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find(
      (item) => Number(item.size) === size && Number(item.pizzaType) === type
    )?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((item) => addedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);
  return pizzaPrice + totalIngredientsPrice;
};
