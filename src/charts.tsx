import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { View, Platform, Text } from "react-native";

import { BarChartProps, LineChartProps, PieChartProps, ChartType } from "./ReactNativeChartUi.types";

// Get native view manager or provide fallback
const getNativeView = () => {
  try {
    return requireNativeViewManager("ReactNativeChartUi");
  } catch (error) {
    console.warn("ReactNativeChartUi native view manager not available:", error);
    return null;
  }
};

// Native view that all chart components will use
const NativeChartView = getNativeView();

// Fallback component when native view is not available
const ChartFallback = ({ chartType }: { chartType: ChartType }) => (
  <View
    style={{
      width: "100%",
      height: 200,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "#666" }}>{Platform.OS === "android" ? "Android support coming soon" : `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart not available`}</Text>
  </View>
);

/**
 * Bar Chart Component
 * Displays data as vertical bars
 */
export function BarChart(props: BarChartProps) {
  const { data, title, xAxisLabel, yAxisLabel, style } = props;

  if (!NativeChartView) {
    return <ChartFallback chartType="bar" />;
  }

  return <NativeChartView data={data} chartType="bar" title={title} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} style={style} />;
}

/**
 * Line Chart Component
 * Displays data as a connected line with points
 */
export function LineChart(props: LineChartProps) {
  const { data, title, xAxisLabel, yAxisLabel, style, interactive = true, lineStyle, points, selection } = props;

  if (!NativeChartView) {
    return <ChartFallback chartType="line" />;
  }

  return <NativeChartView data={data} chartType="line" title={title} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} interactive={interactive} lineStyle={lineStyle} points={points} selection={selection} style={style} />;
}

/**
 * Pie Chart Component
 * Displays data as a pie chart (requires iOS 17+)
 */
export function PieChart(props: PieChartProps) {
  const { data, title, style } = props;

  if (!NativeChartView) {
    return <ChartFallback chartType="pie" />;
  }

  return <NativeChartView data={data} chartType="pie" title={title} style={style} />;
}
