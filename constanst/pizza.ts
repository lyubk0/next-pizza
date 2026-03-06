export const mapPizzaSize = {
<<<<<<< HEAD
  25: "Маленька",
  30: "Середня",
  40: "Велика",
} as const;

export const mapPizzaTypes = {
  1: "Традиційне",
  2: "Тонке",
=======
  25: "Small",
  30: "Medium",
  40: "Large",
} as const;

export const mapPizzaTypes = {
  1: "Traditional",
  2: "Thin",
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([name, value]) => ({
  name: value,
  value: Number(name),
}));

export const pizzaTypes = Object.entries(mapPizzaTypes).map(
  ([name, value]) => ({
    name: value,
    value: Number(name),
  })
);

export type PizzaType = keyof typeof mapPizzaTypes;
export type PizzaSize = keyof typeof mapPizzaSize;
