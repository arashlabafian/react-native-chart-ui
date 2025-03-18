import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import { ChartProps } from "./ReactNativeChartUi.types";

// Native view that all chart components will use
let NativeChartView;
try {
  NativeChartView = requireNativeViewManager("ReactNativeChartUi");
  console.log("Successfully loaded ReactNativeChartUi native view manager");
} catch (error) {
  console.error("Failed to load ReactNativeChartUi native view manager:", error);
  // Fallback to a dummy component for testing
  NativeChartView = props => {
    console.log("Using fallback component with props:", props);
    return <div style={{ width: "100%", height: 200, backgroundColor: "#f0f0f0" }}>Chart Placeholder</div>;
  };
}

/**
 * Bar Chart Component
 * Displays data as vertical bars
 */
export function BarChart(props: ChartProps) {
  const { data, title, xAxisLabel, yAxisLabel, style } = props;
  return <NativeChartView data={data} chartType="bar" title={title} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} style={style} />;
}

/**
 * Line Chart Component
 * Displays data as a connected line with points
 */
export function LineChart(props: ChartProps) {
  const { data, title, xAxisLabel, yAxisLabel, style } = props;
  return <NativeChartView data={data} chartType="line" title={title} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} style={style} />;
}

/**
 * Pie Chart Component
 * Displays data as a pie chart (requires iOS 17+)
 */
export function PieChart(props: ChartProps) {
  const { data, title, style } = props;
  return <NativeChartView data={data} chartType="pie" title={title} style={style} />;
}
