import FOOD_DATA from "./assets/food-data.json";

export type Category =
  | "Condiments, Fats & Oils"
  | "Fruits and Vegetables"
  | "Seafood"
  | "Dairy & Eggs"
  | "Nuts & Seeds"
  | "Meat";

export type Unit = "tbsp" | "cup" | "oz";

export const CategoryColor: { [key in Category]: string } = {
  "Condiments, Fats & Oils": "#FFA07A", // Light Salmon
  "Fruits and Vegetables": "#32CD32", // Lime Green
  Seafood: "#4169E1", // Royal Blue
  "Dairy & Eggs": "#DAA520", // Goldenrod
  "Nuts & Seeds": "#F4A460", // Sandy Brown
  Meat: "#FF6347", // Tomato
};

export const QUANTITIES = {
  "Condiments, Fats & Oils": [1, "tbsp"],
  "Fruits and Vegetables": [1, "cup"],
  Seafood: [3, "oz"],
  "Dairy & Eggs": [1, "oz"],
  "Nuts & Seeds": [1, "oz"],
  Meat: [4, "oz"],
} as { [k in Category]: [number, Unit] };

export interface Facts {
  NetCarbs: number;
  Fats: number;
  Protein: number;
  Calories: number;
}

export interface Ingredient {
  category: Category;
  name: string;
  quantity: number;
  referenceQuantity: number;
  unit: Unit;
  facts: Facts;
}

export type Tables = {
  [category in Category]: { [name: string]: Facts };
};

export const TABLES = FOOD_DATA as Tables;


interface Discrepancy {
  category: string;
  name: string;
  expectedCalories: number;
  actualCalories: number;
  facts: Facts;
}

export const checkAndLogDiscrepancies = (tables: Tables) => {
  const discrepancies: Discrepancy[] = [];

  Object.entries(tables).forEach(([category, ingredients]) => {
    Object.entries(ingredients).forEach(([name, facts]) => {
      const { NetCarbs, Fats, Protein, Calories } = facts;
      const expectedCalories = NetCarbs * 4 + Fats * 9 + Protein * 4;
      const discrepancy = Math.abs(expectedCalories - Calories);

      if (discrepancy > 2) {
        discrepancies.push({
          category,
          name,
          expectedCalories: parseFloat(expectedCalories.toFixed(1)),
          actualCalories: Calories,
          facts
        });
      }
    });
  });

  if (discrepancies.length > 0) {
    console.log("Data discrepancies found", discrepancies);
  }
};

checkAndLogDiscrepancies(TABLES);
