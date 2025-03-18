import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, StyleSheet, TextInput, Switch, ScrollView } from "react-native";
import { ChartType } from "react-native-chart-ui";

export interface ChartConfigProps {
  chartType: ChartType;
  config: {
    // Base properties for all charts
    title?: string;

    // Shared axis properties
    xAxisLabel?: string;
    yAxisLabel?: string;

    // Line chart specific properties
    interactive?: boolean;
    lineStyle?: {
      color?: string;
      width?: number;
      interpolation?: "linear" | "curved";
    };
    points?: {
      visible?: boolean;
      size?: number;
      color?: string;
    };
    selection?: {
      color?: string;
    };

    // Pie chart specific properties (can be extended)
    [key: string]: any; // Allow dynamic property access
  };
  onConfigChange: (newConfig: any) => void;
}

export function ChartConfig({ chartType, config, onConfigChange }: ChartConfigProps) {
  const updateConfig = (path: string, value: any) => {
    const newConfig = { ...config };
    const parts = path.split(".");

    if (parts.length === 1) {
      newConfig[parts[0]] = value;
    } else if (parts.length === 2) {
      if (!newConfig[parts[0]]) newConfig[parts[0]] = {};
      newConfig[parts[0]][parts[1]] = value;
    } else if (parts.length === 3) {
      if (!newConfig[parts[0]]) newConfig[parts[0]] = {};
      if (!newConfig[parts[0]][parts[1]]) newConfig[parts[0]][parts[1]] = {};
      newConfig[parts[0]][parts[1]][parts[2]] = value;
    }

    onConfigChange(newConfig);
  };

  const renderBaseConfig = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Basic Configuration</Text>

      <View style={styles.configItem}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} value={config.title || ""} onChangeText={value => updateConfig("title", value)} placeholder="Chart Title" />
      </View>

      {chartType !== "pie" && (
        <>
          <View style={styles.configItem}>
            <Text style={styles.label}>X-Axis Label</Text>
            <TextInput style={styles.textInput} value={config.xAxisLabel || ""} onChangeText={value => updateConfig("xAxisLabel", value)} placeholder="X Axis" />
          </View>

          <View style={styles.configItem}>
            <Text style={styles.label}>Y-Axis Label</Text>
            <TextInput style={styles.textInput} value={config.yAxisLabel || ""} onChangeText={value => updateConfig("yAxisLabel", value)} placeholder="Y Axis" />
          </View>
        </>
      )}
    </View>
  );

  const renderLineChartConfig = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Line Chart Configuration</Text>

      <View style={styles.configItem}>
        <Text style={styles.label}>Interactive</Text>
        <Switch value={config.interactive ?? true} onValueChange={value => updateConfig("interactive", value)} />
      </View>

      <View style={styles.configItem}>
        <Text style={styles.label}>Line Color</Text>
        <TextInput style={styles.textInput} value={config.lineStyle?.color || "#007AFF"} onChangeText={value => updateConfig("lineStyle.color", value)} placeholder="#007AFF" />
      </View>

      <View style={styles.configItem}>
        <Text style={styles.label}>Line Width: {config.lineStyle?.width || 2}</Text>
        <Slider style={styles.slider} minimumValue={1} maximumValue={5} step={0.5} value={config.lineStyle?.width || 2} onValueChange={value => updateConfig("lineStyle.width", value)} minimumTrackTintColor="#007AFF" maximumTrackTintColor="#DEDEDE" />
      </View>

      <View style={styles.configItem}>
        <Text style={styles.label}>Interpolation</Text>
        <Picker selectedValue={config.lineStyle?.interpolation || "curved"} style={styles.picker} onValueChange={value => updateConfig("lineStyle.interpolation", value)}>
          <Picker.Item label="Linear" value="linear" />
          <Picker.Item label="Curved" value="curved" />
        </Picker>
      </View>

      <View style={styles.configItem}>
        <Text style={styles.label}>Show Points</Text>
        <Switch value={config.points?.visible ?? true} onValueChange={value => updateConfig("points.visible", value)} />
      </View>

      {config.points?.visible && (
        <>
          <View style={styles.configItem}>
            <Text style={styles.label}>Point Size: {config.points?.size || 6}</Text>
            <Slider style={styles.slider} minimumValue={2} maximumValue={12} step={1} value={config.points?.size || 6} onValueChange={value => updateConfig("points.size", value)} minimumTrackTintColor="#007AFF" maximumTrackTintColor="#DEDEDE" />
          </View>

          <View style={styles.configItem}>
            <Text style={styles.label}>Point Color</Text>
            <TextInput style={styles.textInput} value={config.points?.color || "#007AFF"} onChangeText={value => updateConfig("points.color", value)} placeholder="#007AFF" />
          </View>
        </>
      )}

      <View style={styles.configItem}>
        <Text style={styles.label}>Selection Color</Text>
        <TextInput style={styles.textInput} value={config.selection?.color || "rgba(0, 122, 255, 0.3)"} onChangeText={value => updateConfig("selection.color", value)} placeholder="rgba(0, 122, 255, 0.3)" />
      </View>
    </View>
  );

  const renderBarChartConfig = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bar Chart Configuration</Text>
      {/* For now, bar chart only uses the basic configs */}
      <Text style={styles.note}>Basic configuration options apply to this chart type.</Text>
    </View>
  );

  const renderPieChartConfig = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pie Chart Configuration</Text>
      {/* For now, pie chart only uses the basic configs */}
      <Text style={styles.note}>Basic configuration options apply to this chart type.</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderBaseConfig()}

      {chartType === "line" && renderLineChartConfig()}
      {chartType === "bar" && renderBarChartConfig()}
      {chartType === "pie" && renderPieChartConfig()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 12,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  configItem: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
  },
  slider: {
    height: 40,
    width: "100%",
  },
  picker: {
    height: 120,
    width: "100%",
  },
  note: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
  },
});
