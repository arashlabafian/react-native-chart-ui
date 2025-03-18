import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-ui";

import { useChartData } from "../hooks/useChartData";

interface ChartExampleProps {
  title: string;
  initialType?: "bar" | "line" | "pie";
}

export function ChartExample({ title, initialType = "bar" }: ChartExampleProps) {
  const { chartType, data, changeChartType, shuffleData } = useChartData(initialType);

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <BarChart data={data} title="Bar Chart Example" xAxisLabel="Months" yAxisLabel="Values" style={styles.chart} />;
      case "line":
        return <LineChart data={data} title="Line Chart Example" xAxisLabel="Days" yAxisLabel="Values" style={styles.chart} />;
      case "pie":
        return <PieChart data={data} title="Pie Chart Example" style={styles.chart} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.chartContainer}>{renderChart()}</View>

      <View style={styles.buttonContainer}>
        <Button title="Bar Chart" onPress={() => changeChartType("bar")} disabled={chartType === "bar"} />
        <Button title="Line Chart" onPress={() => changeChartType("line")} disabled={chartType === "line"} />
        <Button title="Pie Chart" onPress={() => changeChartType("pie")} disabled={chartType === "pie"} />
      </View>

      <Button title="Shuffle Data" onPress={shuffleData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  chartContainer: {
    height: 300,
    marginBottom: 16,
  },
  chart: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
});
