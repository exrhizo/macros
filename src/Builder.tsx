import { useState } from "react";
import styled from "@emotion/styled";
import FoodTable from "./FoodTable";
import Pot from "./Pot";
import { TABLES, Category, Ingredient } from "./data";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

function Builder() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const onChangeQuantity = (name: string, quantity: number) => {
    if (quantity === 0) {
      setIngredients(
        ingredients.filter((ingredient) => ingredient.name !== name)
      );
      return;
    }

    const newIngredients = ingredients.map((ingredient) =>
      ingredient.name === name ? { ...ingredient, quantity } : ingredient
    );
    setIngredients(newIngredients);
  };

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <div>
      <Pot ingredients={ingredients} onChangeQuantity={onChangeQuantity} />
      <GridContainer>
        {Object.keys(TABLES).map((category) => (
          <FoodTable
            key={category}
            category={category as Category}
            data={TABLES}
            addIngredient={addIngredient}
          />
        ))}
      </GridContainer>
    </div>
  );
}

export default Builder;
