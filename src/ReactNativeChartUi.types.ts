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
 * Base props for all chart components
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
   * Optional style for the chart container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for charts that support axis labels (bar and line)
 */
export interface AxisChartProps extends ChartProps {
  /**
   * Optional x-axis label for the chart
   */
  xAxisLabel?: string;

  /**
   * Optional y-axis label for the chart
   */
  yAxisLabel?: string;
}

/**
 * Internal props for the native chart view component
 */
export interface ReactNativeChartUiViewProps extends AxisChartProps {
  chartType: ChartType;

  /**
   * Interactive mode for charts that support it
   */
  interactive?: boolean;

  /**
   * Line style configuration
   */
  lineStyle?: {
    color?: string;
    width?: number;
    interpolation?: "linear" | "curved";
  };

  /**
   * Point configuration
   */
  points?: {
    visible?: boolean;
    size?: number;
    color?: string;
  };

  /**
   * Selection configuration
   */
  selection?: {
    color?: string;
  };
}

/**
 * Event payload types
 */
export type OnChartLoadEventPayload = {
  chartType: string;
};

export type ChangeEventPayload = {
  value: string;
};

/**
 * Module event types
 */
export type ReactNativeChartUiModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
  onChartLoad: (params: OnChartLoadEventPayload) => void;
};

/**
 * Props for BarChart component
 */
export type BarChartProps = AxisChartProps;

/**
 * Props for LineChart component
 */
export type LineChartProps = AxisChartProps & {
  /**
   * Enable interactive features like tooltips and selection
   */
  interactive?: boolean;

  /**
   * Optional configuration for line style
   */
  lineStyle?: {
    /**
     * Color of the line
     */
    color?: string;

    /**
     * Width of the line
     */
    width?: number;

    /**
     * Style of the line interpolation
     */
    interpolation?: "linear" | "curved";
  };

  /**
   * Optional configuration for data points
   */
  points?: {
    /**
     * Whether to show points
     */
    visible?: boolean;

    /**
     * Size of the points
     */
    size?: number;

    /**
     * Color of the points
     */
    color?: string;
  };

  /**
   * Optional configuration for selection behavior
   */
  selection?: {
    /**
     * Color of the selection indicator
     */
    color?: string;

    /**
     * Callback when a point is selected
     */
    onSelect?: (point: ChartDataPoint) => void;
  };
};

/**
 * Props for PieChart component - doesn't use axis labels
 */
export type PieChartProps = ChartProps;
