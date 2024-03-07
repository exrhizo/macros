import React from "react";
import Stack from "./Stack";
import styled from "@emotion/styled";
import {
  Tables,
  Category,
  CategoryColor,
  QUANTITIES,
  Ingredient,
} from "./data";

interface FoodTableProps {
  category: Category;
  data: Tables;
  addIngredient: (ingredient: Ingredient) => void;
}

const TableContainer = styled.div`
  margin-bottom: 1em;
`;

const Title = styled.h2<{ category: Category }>`
  font-size: 2em;
  padding: 1em;
  background-color: ${({ category }) => CategoryColor[category]};
  color: white;
`;

const NamedStack = styled.div`
  display: flex;
  height: 3rem;
  > div:first-child {
    width: 12rem;
    flex-shrink: 0;
  }
  > div:last-child {
    flex-grow: 1;
  }
`;

const StackName = styled.div<{ category: Category }>`
  color: white;
  font-size: 1.5rem;
  background-color: ${({ category }) => CategoryColor[category]};
  text-align: left;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FoodTable: React.FC<FoodTableProps> = ({
  category,
  data,
  addIngredient,
}) => {
  const [quantity, unit] = QUANTITIES[category];
  return (
    <TableContainer>
      <Title category={category}>
        {category} - {quantity} {unit}
      </Title>
      {Object.entries(data[category]).map(([name, facts]) => (
        <NamedStack key={name}>
          <StackName
            category={category}
            onClick={() =>
              addIngredient({ category, name, facts, quantity, unit })
            }
          >
            {name}
          </StackName>
          <Stack
            fat={facts.Fats}
            protein={facts.Protein}
            netCarbs={facts.NetCarbs}
            category={category}
          />
        </NamedStack>
      ))}
    </TableContainer>
  );
};

export default FoodTable;
