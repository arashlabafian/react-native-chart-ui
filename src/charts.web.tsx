// This component is not intended for web use
import * as React from "react";

import { ChartProps } from "./ReactNativeChartUi.types";

/**
 * Bar Chart Component - Web version (not supported)
 */
export function BarChart(props: ChartProps) {
  throw new Error("ReactNativeChartUi is not supported on web platforms");
}

/**
 * Line Chart Component - Web version (not supported)
 */
export function LineChart(props: ChartProps) {
  throw new Error("ReactNativeChartUi is not supported on web platforms");
}

/**
 * Pie Chart Component - Web version (not supported)
 */
export function PieChart(props: ChartProps) {
  throw new Error("ReactNativeChartUi is not supported on web platforms");
}
