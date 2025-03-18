import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-ui";

import { ChartConfig } from "./ChartConfig";
import { useChartData } from "../hooks/useChartData";

interface ChartExampleProps {
  title: string;
  initialType?: "bar" | "line" | "pie";
}

export function ChartExample({ title, initialType = "bar" }: ChartExampleProps) {
  const { chartType, data, changeChartType, shuffleData } = useChartData(initialType);
  const [showConfig, setShowConfig] = useState(false);
  const [chartConfig, setChartConfig] = useState({
    // Default configuration
    title: chartType === "bar" ? "Sales by Month" : chartType === "line" ? "Weekly Performance" : "Market Share",
    xAxisLabel: chartType === "bar" ? "Months" : "Days",
    yAxisLabel: chartType === "bar" ? "Revenue" : "Values",
    interactive: true,
    lineStyle: {
      color: "#007AFF",
      width: 2,
      interpolation: "curved" as "curved" | "linear",
    },
    points: {
      visible: true,
      size: 6,
      color: "#007AFF",
    },
    selection: {
      color: "rgba(0, 122, 255, 0.3)",
    },
    yAxis: {
      autoScale: true,
      min: 0,
      max: 100,
    },
  });

  // Update config when changing chart type for better defaults
  React.useEffect(() => {
    setChartConfig(prev => ({
      ...prev,
      title: chartType === "bar" ? "Sales by Month" : chartType === "line" ? "Weekly Performance" : "Market Share",
      xAxisLabel: chartType === "bar" ? "Months" : "Days",
      yAxisLabel: chartType === "bar" ? "Revenue" : "Values",
    }));
  }, [chartType]);

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <BarChart data={data} title={chartConfig.title} xAxisLabel={chartConfig.xAxisLabel} yAxisLabel={chartConfig.yAxisLabel} style={styles.chart} />;
      case "line":
        return (
          <LineChart
            data={data}
            title={chartConfig.title}
            xAxisLabel={chartConfig.xAxisLabel}
            yAxisLabel={chartConfig.yAxisLabel}
            style={styles.chart}
            interactive={chartConfig.interactive}
            lineStyle={chartConfig.lineStyle}
            points={chartConfig.points}
            selection={chartConfig.selection}
            yAxis={chartConfig.yAxis}
          />
        );
      case "pie":
        return <PieChart data={data} title={chartConfig.title} style={styles.chart} />;
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

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={shuffleData}>
          <Text style={styles.actionButtonText}>Shuffle Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => setShowConfig(!showConfig)}>
          <Text style={styles.actionButtonText}>{showConfig ? "Hide Configuration" : "Configure Chart"}</Text>
        </TouchableOpacity>
      </View>

      {showConfig && (
        <View style={styles.configContainer}>
          <ChartConfig chartType={chartType} config={chartConfig} onConfigChange={setChartConfig} />
        </View>
      )}
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
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  chartContainer: {
    height: 250,
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  configContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
    height: 300,
  },
});
