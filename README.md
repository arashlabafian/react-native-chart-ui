# React Native Chart UI

A native chart library for React Native that provides high-performance chart components leveraging Swift Charts for iOS.

> **⚠️ ALPHA STATUS**: This library is in early alpha stages and actively being developed. It is **NOT** ready for production use. APIs may change significantly between versions without notice.

## Features

- ✅ iOS Support:
  - Bar Charts, Line Charts (requires iOS 16.0+)
  - Pie Charts (requires iOS 17.0+)
  - **Note**: iOS implementation is functional but still in active development
- ❌ Android Support: In development
- ❌ Web Support: Not planned

## Installation

```bash
npm install react-native-chart-ui
# or
yarn add react-native-chart-ui
```

## Usage

### Bar Chart

```jsx
import { BarChart } from "react-native-chart-ui";

export default function BarChartExample() {
  return (
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
    />
  );
}
```

### Line Chart

```jsx
import { LineChart } from "react-native-chart-ui";

export default function LineChartExample() {
  return (
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
    />
  );
}
```

### Pie Chart

```jsx
import { PieChart } from "react-native-chart-ui";

export default function PieChartExample() {
  return (
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
    />
  );
}
```

## Platform Compatibility

| Chart Type | iOS              | Android           | Web            |
| ---------- | ---------------- | ----------------- | -------------- |
| Bar Chart  | ✅ (iOS 16.0+)\* | 🚧 In development | ❌ Not planned |
| Line Chart | ✅ (iOS 16.0+)\* | 🚧 In development | ❌ Not planned |
| Pie Chart  | ✅ (iOS 17.0+)\* | 🚧 In development | ❌ Not planned |

\* iOS implementation is functional but still in active development. Features and APIs may change.

On unsupported iOS versions, the component will render a fallback view.

## Runtime Compatibility Check

You can check which chart types are available at runtime:

```jsx
import { ReactNativeChartUiModule } from "react-native-chart-ui";

async function checkAvailableCharts() {
  const availableCharts = await ReactNativeChartUiModule.getAvailableChartTypes();
  console.log(availableCharts); // e.g. { BAR: "bar", LINE: "line", PIE: "pie" }
}
```

## Roadmap

- Improve and expand iOS implementation
- Complete Android implementation using Jetpack Compose
- Add more chart types (area, scatter, candlestick)
- Improve customization options
- Add animation support
- Add comprehensive theming

## Contributing

Contributions are welcome! As this is an alpha project, please open an issue before submitting pull requests to discuss potential changes or additions.

## Development

This project is built using Expo modules. It provides native chart components for iOS using Swift Charts with plans to support Android using Jetpack Compose.

## License

MIT
