import styled from "@emotion/styled";
import { Category, CategoryColor } from "./data";

interface StackProps {
  fat: number;
  protein: number;
  netCarbs: number;
  category?: Category;
  leftAlign?: boolean;
}

const Bar = styled.div<{ width: string; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: transparent;
  background-color: ${({ color }) => color};
  width: ${({ width }) => `${width}%`};
`;

const Label = styled.div<{ leftAlign: boolean }>`
  color: white;
  position: absolute;
  left: 1rem;
  top: 0;
  right: 1rem;
  bottom: 0;
  font-size: 1.5em;
  display: flex;
  justify-content: ${({ leftAlign }) => (leftAlign ? "flex-start" : "center")};
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Percentages = styled.div<{ leftAlign: boolean }>`
  color: transparent;
  position: absolute;
  left: 1rem;
  top: 0;
  right: 1rem;
  bottom: 0;
  font-size: 1.5em;
  display: flex;
  justify-content: ${({ leftAlign }) => (leftAlign ? "flex-start" : "center")};
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Container = styled.div<{ category?: Category }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  background-color: ${({ category }) =>
    category ? CategoryColor[category] : "transparent"};
  &:hover ${Percentages} {
    color: white;
  }
  &:hover ${Label} {
    color: transparent;
  }
`;

const calculatePercentage = (value: number, total: number) =>
  ((value / total) * 100).toFixed(0);

const Stack: React.FC<StackProps> = ({
  fat,
  protein,
  netCarbs,
  category,
  leftAlign,
}) => {
  const totalCalories = fat * 9 + protein * 4 + netCarbs * 4;

  const fatPercentage = calculatePercentage(fat * 9, totalCalories);
  const proteinPercentage = calculatePercentage(protein * 4, totalCalories);
  const netCarbsPercentage = calculatePercentage(netCarbs * 4, totalCalories);

  return (
    <Container category={category}>
      {fat ? <Bar width={fatPercentage} color="#00000080" /> : null}
      {protein ? <Bar width={proteinPercentage} color="#88888880" /> : null}
      {netCarbs ? <Bar width={netCarbsPercentage} color="#FFFFFF80" /> : null}
      <Label leftAlign={Boolean(leftAlign)}>
        {Math.round(totalCalories)} cal
      </Label>
      <Percentages leftAlign={Boolean(leftAlign)}>
        {fatPercentage}:{proteinPercentage}:{netCarbsPercentage}
      </Percentages>
    </Container>
  );
};

export default Stack;
