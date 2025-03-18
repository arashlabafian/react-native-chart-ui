import { ChartDataPoint } from "react-native-chart-ui";

// Mock data for Bar Chart
export const barChartData: ChartDataPoint[] = [
  { label: "Jan", value: 10 },
  { label: "Feb", value: 25 },
  { label: "Mar", value: 15 },
  { label: "Apr", value: 30 },
  { label: "May", value: 18 },
  { label: "Jun", value: 22 },
];

// Mock data for Line Chart
export const lineChartData: ChartDataPoint[] = [
  { label: "Mon", value: 5 },
  { label: "Tue", value: 8 },
  { label: "Wed", value: 12 },
  { label: "Thu", value: 10 },
  { label: "Fri", value: 15 },
  { label: "Sat", value: 20 },
  { label: "Sun", value: 18 },
];

// Multi-series data for advanced Line Chart examples
export const multiSeriesData = [
  {
    name: "San Francisco",
    color: "#8A2BE2", // Purple
    data: [
      { label: "Mon", value: 12 },
      { label: "Tue", value: 15 },
      { label: "Wed", value: 18 },
      { label: "Thu", value: 14 },
      { label: "Fri", value: 20 },
      { label: "Sat", value: 28 },
      { label: "Sun", value: 24 },
    ],
  },
  {
    name: "Cupertino",
    color: "#32CD32", // Green
    data: [
      { label: "Mon", value: 8 },
      { label: "Tue", value: 10 },
      { label: "Wed", value: 13 },
      { label: "Thu", value: 9 },
      { label: "Fri", value: 11 },
      { label: "Sat", value: 15 },
      { label: "Sun", value: 14 },
    ],
  },
];

// Mock data for Pie Chart
export const pieChartData: ChartDataPoint[] = [
  { label: "Category A", value: 30 },
  { label: "Category B", value: 25 },
  { label: "Category C", value: 20 },
  { label: "Category D", value: 15 },
  { label: "Category E", value: 10 },
];
