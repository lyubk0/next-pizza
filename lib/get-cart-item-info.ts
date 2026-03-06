import { mapPizzaTypes, PizzaSize, PizzaType } from "../constanst/pizza";

export const getCartItemInfo = (
  info: string,
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
) => {
  if (pizzaType && pizzaSize) {
    const typeName = mapPizzaTypes[pizzaType];
<<<<<<< HEAD
    return `${typeName} тісто, ${pizzaSize} см`;
=======
    return `${typeName} dough, ${pizzaSize} cm`;
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
  }

  return info;
};
