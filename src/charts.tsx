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
  const { data, title, xAxisLabel, yAxisLabel, style, interactive = true, lineStyle, points, selection, yAxis } = props;

  if (!NativeChartView) {
    return <ChartFallback chartType="line" />;
  }

  // Extract individual props from nested objects
  const lineColor = lineStyle?.color || "#007AFF";
  const lineWidth = lineStyle?.width || 2;
  const lineInterpolation = lineStyle?.interpolation || "curved";

  const showPoints = points?.visible ?? true;
  const pointSize = points?.size || 6;
  const pointColor = points?.color || "#007AFF";

  const selectionColor = selection?.color || "rgba(0, 122, 255, 0.3)";

  // Y-axis scale configuration
  const autoScaleYAxis = yAxis?.autoScale !== false;
  const yAxisMin = yAxis?.min ?? 0;
  const yAxisMax = yAxis?.max ?? 100;

  return (
    <NativeChartView
      data={data}
      chartType="line"
      title={title}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      interactive={interactive}
      // Pass individual props instead of objects
      lineColor={lineColor}
      lineWidth={lineWidth}
      lineInterpolation={lineInterpolation}
      showPoints={showPoints}
      pointSize={pointSize}
      pointColor={pointColor}
      selectionColor={selectionColor}
      // Y-axis scale props
      autoScaleYAxis={autoScaleYAxis}
      yAxisMin={yAxisMin}
      yAxisMax={yAxisMax}
      style={style}
    />
  );
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
