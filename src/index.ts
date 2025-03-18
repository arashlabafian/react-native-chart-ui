// Reexport the native module. On web, it will be resolved to ReactNativeChartUiModule.web.ts
// and on native platforms to ReactNativeChartUiModule.ts
import { ChartDataPoint, ChartProps, ChartType, ReactNativeChartUiViewProps } from "./ReactNativeChartUi.types";
import ReactNativeChartUiModule from "./ReactNativeChartUiModule";
import { BarChart, LineChart, PieChart } from "./charts";

export {
  // Chart components
  BarChart,
  LineChart,
  PieChart,

  // Module and types
  ReactNativeChartUiModule,
  ChartDataPoint,
  ChartProps,
  ChartType,
  ReactNativeChartUiViewProps,
};

// Export BarChart as the default export since it's likely the most commonly used
export default BarChart;
