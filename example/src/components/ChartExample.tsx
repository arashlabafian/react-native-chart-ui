import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
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
        return <BarChart data={data} title="Sales by Month" xAxisLabel="Months" yAxisLabel="Revenue" style={styles.chart} />;
      case "line":
        return (
          <LineChart
            data={data}
            title="Weekly Performance"
            xAxisLabel="Days"
            yAxisLabel="Values"
            style={styles.chart}
            interactive
            lineStyle={{
              color: "#007AFF",
              width: 2,
              interpolation: "curved",
            }}
            points={{
              visible: true,
              size: 6,
              color: "#007AFF",
            }}
            selection={{
              color: "rgba(0, 122, 255, 0.3)",
              onSelect: point => {
                console.log("Selected point:", point);
              },
            }}
          />
        );
      case "pie":
        return <PieChart data={data} title="Market Share" style={styles.chart} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.chartContainer}>{renderChart()}</View>

      <View style={styles.buttonContainer}>
        <ChartTypeButton title="Bar Chart" onPress={() => changeChartType("bar")} isSelected={chartType === "bar"} />
        <ChartTypeButton title="Line Chart" onPress={() => changeChartType("line")} isSelected={chartType === "line"} />
        <ChartTypeButton title="Pie Chart" onPress={() => changeChartType("pie")} isSelected={chartType === "pie"} />
      </View>

      <TouchableOpacity style={styles.shuffleButton} onPress={shuffleData}>
        <Text style={styles.shuffleButtonText}>Shuffle Data</Text>
      </TouchableOpacity>
    </View>
  );
}

// Chart type selection button component
interface ChartTypeButtonProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

function ChartTypeButton({ title, onPress, isSelected }: ChartTypeButtonProps) {
  return (
    <TouchableOpacity style={[styles.chartTypeButton, isSelected && styles.chartTypeButtonSelected]} onPress={onPress} disabled={isSelected}>
      <Text style={[styles.chartTypeButtonText, isSelected && styles.chartTypeButtonTextSelected]}>{title}</Text>
    </TouchableOpacity>
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
  chartTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
    minWidth: 100,
    alignItems: "center",
  },
  chartTypeButtonSelected: {
    backgroundColor: "#007AFF",
  },
  chartTypeButtonText: {
    color: "#333",
    fontWeight: "500",
  },
  chartTypeButtonTextSelected: {
    color: "#fff",
  },
  shuffleButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  shuffleButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});
