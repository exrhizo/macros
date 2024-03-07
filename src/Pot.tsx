import React from "react";

import { Input, Button } from "@mui/material";
import styled from "@emotion/styled";

import { Ingredient } from "./data";
import Stack from "./Stack";
import pot from "./assets/pot.png";

const Reflow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PotBackground = styled.div`
  background-image: url(${pot});
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
`;

const IngredientItem = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const IngredientEditor = styled.div`
  width: 40rem;
  display: flex;
`;

const IngredientBar = styled.div<{ width: number }>`
  display: flex;
  align-items: start;
  flex-grow: 1;
  > div {
    width: ${(props) => props.width}%;
  }
`;

interface PotProps {
  ingredients: Ingredient[];
  onChangeQuantity: (name: string, quantity: number) => void;
}

const Pot: React.FC<PotProps> = ({ ingredients, onChangeQuantity }) => {
  const maxCalories = Math.max(
    ...ingredients.map((ingredient) => ingredient.facts.Calories)
  );
  const totalCalories = ingredients.reduce(
    (acc, curr) => acc + curr.facts.Calories * curr.quantity,
    0
  );
  console.log("calories", {maxCalories, totalCalories, Calories: ingredients.map(i => i.facts.Calories), ingredients})

  return (
    <Reflow>
      <PotBackground>Total Calories: {totalCalories}</PotBackground>
      <IngredientList>
        {ingredients.map(({name, quantity, facts, category}, index) => (
          <IngredientItem key={index}>
            <IngredientEditor>
              <p>{name}</p>
              <Button
                onClick={() =>
                  onChangeQuantity(name, quantity - 0.25)
                }
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  onChangeQuantity(name, parseFloat(e.target.value))
                }
                style={{ width: "60px", margin: "0 10px" }}
              />
              <Button
                onClick={() =>
                  onChangeQuantity(name, quantity + 0.25)
                }
              >
                +
              </Button>
            </IngredientEditor>

            <IngredientBar
              width={(facts.Calories / maxCalories) * 100}
            >
              <Stack
                fat={facts.Fats}
                protein={facts.Protein}
                netCarbs={facts.NetCarbs}
                category={category}
              />
            </IngredientBar>
          </IngredientItem>
        ))}
      </IngredientList>
    </Reflow>
  );
};

export default Pot;
