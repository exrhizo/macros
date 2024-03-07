import React from "react";

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";

import { Ingredient } from "./data";
import Stack from "./Stack";
import pot from "./assets/pot.png";

const PotBackground = styled.div`
  font-size: 3rem;
  background-image: url(${pot});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #0e1a26;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 20rem;
  padding-bottom: 1rem;
`;

const Reflow = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 80rem) {
    flex-direction: row;
    ${PotBackground} {
      width: 30rem;
      height: 30rem;
    }
  }
`;

const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const IngredientItem = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const IngredientEditor = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const scale = (val: number, q: number, ref: number) => val * (q / ref);

  const maxCalories = Math.max(
    ...ingredients.map((ingredient) =>
      scale(
        ingredient.facts.Calories,
        ingredient.quantity,
        ingredient.referenceQuantity
      )
    )
  );
  const totalCalories = ingredients.reduce(
    (acc, curr) =>
      acc + scale(curr.facts.Calories, curr.quantity, curr.referenceQuantity),
    0
  );

  const totalFats = ingredients.reduce(
    (acc, curr) =>
      acc + scale(curr.facts.Fats, curr.quantity, curr.referenceQuantity),
    0
  );
  const totalProtein = ingredients.reduce(
    (acc, curr) =>
      acc + scale(curr.facts.Protein, curr.quantity, curr.referenceQuantity),
    0
  );
  const totalNetCarbs = ingredients.reduce(
    (acc, curr) =>
      acc + scale(curr.facts.NetCarbs, curr.quantity, curr.referenceQuantity),
    0
  );
  console.log("calories", {
    maxCalories,
    totalCalories,
    Calories: ingredients.map((i) => i.facts.Calories),
    ingredients,
  });

  return (
    <Reflow>
      <PotBackground>
        {totalCalories ? (
          <Stack
            fat={totalFats}
            protein={totalProtein}
            netCarbs={totalNetCarbs}
          />
        ) : null}
      </PotBackground>
      <IngredientList>
        {ingredients.map(
          (
            { name, quantity, referenceQuantity, facts, category, unit },
            index
          ) => (
            <IngredientItem key={index}>
              <IngredientEditor>
                <div>{name}</div>
                <div>
                  <IconButton
                    onClick={() => onChangeQuantity(name, quantity - 0.25)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  {quantity.toFixed(2)} {unit}
                  <IconButton
                    onClick={() => onChangeQuantity(name, quantity + 0.25)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </IngredientEditor>

              <IngredientBar
                width={
                  (scale(facts.Calories, quantity, referenceQuantity) /
                    maxCalories) *
                  100
                }
              >
                <Stack
                  fat={scale(facts.Fats, quantity, referenceQuantity)}
                  protein={scale(facts.Protein, quantity, referenceQuantity)}
                  netCarbs={scale(facts.NetCarbs, quantity, referenceQuantity)}
                  category={category}
                  leftAlign
                />
              </IngredientBar>
            </IngredientItem>
          )
        )}
      </IngredientList>
    </Reflow>
  );
};

export default Pot;
