const GOLD = [30, 24];
const SILVER = [23, 18];

const classifyMark = (averageMark: number) => {
  if (averageMark <= GOLD[0] && averageMark >= GOLD[1]) {
    return "gold";
  } else if (averageMark <= SILVER[0] && averageMark >= SILVER[1]) {
    return "silver";
  } else "bronze";
};

export default classifyMark;
