# React Native Chart UI

A React Native module that provides native chart components for iOS using Swift Charts.

## Current Status

- ✅ iOS Support:
  - Bar Charts, Line Charts (requires iOS 16.0+)
  - Pie Charts (requires iOS 17.0+)
- ❌ Android Support: Coming soon
- ❌ Web Support: Not planned

## Installation

```bash
npm install react-native-chart-ui
```

## Usage

### Bar Chart

```jsx
import { BarChart } from "react-native-chart-ui";

// In your component:
<BarChart
  data={[
    { label: "Jan", value: 10 },
    { label: "Feb", value: 25 },
    { label: "Mar", value: 15 },
    { label: "Apr", value: 30 },
    { label: "May", value: 18 },
    { label: "Jun", value: 22 },
  ]}
  title="Monthly Sales"
  xAxisLabel="Months"
  yAxisLabel="Sales"
  style={{ height: 300 }}
/>;
```

### Line Chart

```jsx
import { LineChart } from "react-native-chart-ui";

// In your component:
<LineChart
  data={[
    { label: "Mon", value: 5 },
    { label: "Tue", value: 8 },
    { label: "Wed", value: 12 },
    { label: "Thu", value: 10 },
    { label: "Fri", value: 15 },
    { label: "Sat", value: 20 },
    { label: "Sun", value: 18 },
  ]}
  title="Weekly Activity"
  xAxisLabel="Days"
  yAxisLabel="Activity"
  style={{ height: 300 }}
/>;
```

### Pie Chart

```jsx
import { PieChart } from "react-native-chart-ui";

// In your component:
<PieChart
  data={[
    { label: "Category A", value: 30 },
    { label: "Category B", value: 25 },
    { label: "Category C", value: 20 },
    { label: "Category D", value: 15 },
    { label: "Category E", value: 10 },
  ]}
  title="Sales Distribution"
  style={{ height: 300 }}
/>;
```

## Version Compatibility

- **iOS 16.0+**: Bar charts and line charts require iOS 16.0 or newer
- **iOS 17.0+**: Pie charts require iOS 17.0 or newer
- **Fallback**: On older iOS versions, a fallback view will be displayed

You can check which chart types are available at runtime:

```jsx
import { ReactNativeChartUiModule } from "react-native-chart-ui";

async function checkAvailableCharts() {
  const availableCharts = await ReactNativeChartUiModule.getAvailableChartTypes();
  console.log(availableCharts); // e.g. { BAR: "bar", LINE: "line", PIE: "pie" }
}
```

## Development

This project is built using Expo modules. It provides native chart components for iOS using Swift Charts.

## License

MIT
