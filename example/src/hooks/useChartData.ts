import { useState, useCallback } from "react";
import { ChartDataPoint } from "react-native-chart-ui";

import { barChartData, lineChartData, pieChartData } from "../data/chartData";

type ChartType = "bar" | "line" | "pie";

export function useChartData(initialType: ChartType = "bar") {
  const [chartType, setChartType] = useState<ChartType>(initialType);
  const [data, setData] = useState<ChartDataPoint[]>(getDataForType(initialType));

  function getDataForType(type: ChartType): ChartDataPoint[] {
    switch (type) {
      case "bar":
        return [...barChartData];
      case "line":
        return [...lineChartData];
      case "pie":
        return [...pieChartData];
      default:
        return [];
    }
  }

  const changeChartType = useCallback((type: ChartType) => {
    setChartType(type);
    setData(getDataForType(type));
  }, []);

  const shuffleData = useCallback(() => {
    setData(prevData => {
      const newData = [...prevData];
      // Update the values randomly
      return newData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 50) + 5,
      }));
    });
  }, []);

  return {
    chartType,
    data,
    changeChartType,
    shuffleData,
  };
}
