import styled from "@emotion/styled";
import { Category, CategoryColor } from "./data";

interface StackProps {
  fat: number;
  protein: number;
  netCarbs: number;
  category: Category;
}

const Bar = styled.div<{ width: string; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: transparent;
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
`;

const Label = styled.div`
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Container = styled.div<{ category: Category }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  background-color: ${({ category }) => CategoryColor[category]};
  &:hover ${Bar} {
    color: white;
  }
  &:hover ${Label} {
    color: transparent;
  }
`;

const calculatePercentage = (value: number, total: number) =>
  `${Math.round((value / total) * 1000)/10}%`;

const Stack: React.FC<StackProps> = ({ fat, protein, netCarbs, category }) => {
  const totalCalories = fat * 9 + protein * 4 + netCarbs * 4;

  const fatPercentage = calculatePercentage(fat * 9, totalCalories);
  const proteinPercentage = calculatePercentage(protein * 4, totalCalories);
  const netCarbsPercentage = calculatePercentage(netCarbs * 4, totalCalories);

  return (
    <Container category={category} >
      {fat ? <Bar width={fatPercentage} color="#00000080">{fat}g</Bar> : null}
      {protein ? <Bar width={proteinPercentage} color="#88888880">{protein}g</Bar> : null}
      {netCarbs ? <Bar width={netCarbsPercentage} color="#FFFFFF80">{netCarbs}g</Bar> : null}
      <Label>{Math.round(totalCalories)} cal</Label>
    </Container>
  );
};

export default Stack;
