import type { StyleProp, ViewStyle } from "react-native";

/**
 * Chart data point structure representing a single data point
 */
export type ChartDataPoint = {
  label: string;
  value: number;
};

/**
 * Available chart types
 */
export type ChartType = "bar" | "line" | "pie";

/**
 * Internal props for the native chart view component
 */
export interface ReactNativeChartUiViewProps {
  data: ChartDataPoint[];
  chartType: ChartType;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for all chart components
 */
export interface ChartProps {
  /**
   * The data to display in the chart
   */
  data: ChartDataPoint[];

  /**
   * Optional title for the chart
   */
  title?: string;

  /**
   * Optional x-axis label for the chart
   */
  xAxisLabel?: string;

  /**
   * Optional y-axis label for the chart
   */
  yAxisLabel?: string;

  /**
   * Optional style for the chart container
   */
  style?: StyleProp<ViewStyle>;
}

export type OnLoadEventPayload = {
  url: string;
};

export type OnChartLoadEventPayload = {
  chartType: string;
};

export type ReactNativeChartUiModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  onChartLoad: (params: OnChartLoadEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type BarChartProps = {
  data: ChartDataPoint[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export type LineChartProps = {
  data: ChartDataPoint[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export type PieChartProps = {
  data: ChartDataPoint[];
  title?: string;
  style?: StyleProp<ViewStyle>;
};
