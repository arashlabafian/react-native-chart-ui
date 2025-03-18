import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, StyleSheet, TextInput, Switch, ScrollView, TouchableOpacity } from "react-native";
import { ChartType } from "react-native-chart-ui";

// Predefined colors for selection
const COLORS = [
  { name: "Blue", value: "#007AFF" },
  { name: "Red", value: "#FF3B30" },
  { name: "Green", value: "#34C759" },
  { name: "Purple", value: "#AF52DE" },
  { name: "Orange", value: "#FF9500" },
  { name: "Teal", value: "#5AC8FA" },
  { name: "Pink", value: "#FF2D55" },
];

// Component for color selection
interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  return (
    <View style={styles.colorPickerContainer}>
      {COLORS.map(color => (
        <TouchableOpacity key={color.value} style={[styles.colorOption, { backgroundColor: color.value }, selectedColor === color.value && styles.colorOptionSelected]} onPress={() => onSelectColor(color.value)} />
      ))}
    </View>
  );
}

// Segmented control for binary choices - more iOS-like
interface SegmentedControlProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

function SegmentedControl({ options, selectedValue, onValueChange }: SegmentedControlProps) {
  return (
    <View style={styles.segmentedContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          style={[styles.segmentOption, index === 0 && styles.segmentOptionFirst, index === options.length - 1 && styles.segmentOptionLast, selectedValue === option.value && styles.segmentOptionSelected]}
          onPress={() => onValueChange(option.value)}
        >
          <Text style={[styles.segmentText, selectedValue === option.value && styles.segmentTextSelected]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

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

    // Y-axis scale configuration
    yAxis?: {
      autoScale?: boolean;
      min?: number;
      max?: number;
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

      {/* Line Style Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Line Style</Text>

        <View style={styles.cardRow}>
          <Text style={styles.label}>Interpolation</Text>
          <SegmentedControl
            options={[
              { label: "Linear", value: "linear" },
              { label: "Curved", value: "curved" },
            ]}
            selectedValue={config.lineStyle?.interpolation || "curved"}
            onValueChange={value => updateConfig("lineStyle.interpolation", value)}
          />
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.label}>Line Width</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.compactSlider}
              minimumValue={1}
              maximumValue={5}
              step={0.5}
              value={config.lineStyle?.width || 2}
              onValueChange={value => updateConfig("lineStyle.width", value)}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#DEDEDE"
            />
            <Text style={styles.sliderValue}>{config.lineStyle?.width || 2}</Text>
          </View>
        </View>
      </View>

      {/* Y-Axis Scale Card */}
      <View style={styles.card}>
        <View style={styles.cardRowSpaced}>
          <Text style={styles.cardTitle}>Y-Axis Scale</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Auto</Text>
            <Switch
              value={config.yAxis?.autoScale !== false}
              onValueChange={value => updateConfig("yAxis.autoScale", value)}
              trackColor={{ false: "#d3d3d3", true: "#007AFF50" }}
              thumbColor={config.yAxis?.autoScale !== false ? "#007AFF" : "#f4f3f4"}
            />
          </View>
        </View>

        {config.yAxis?.autoScale === false && (
          <>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Min Value</Text>
              <TextInput
                style={styles.numberInput}
                value={config.yAxis?.min?.toString() || "0"}
                onChangeText={value => {
                  const numValue = Number(value);
                  if (!isNaN(numValue)) {
                    updateConfig("yAxis.min", numValue);
                  }
                }}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>

            <View style={styles.cardRow}>
              <Text style={styles.label}>Max Value</Text>
              <TextInput
                style={styles.numberInput}
                value={config.yAxis?.max?.toString() || "100"}
                onChangeText={value => {
                  const numValue = Number(value);
                  if (!isNaN(numValue)) {
                    updateConfig("yAxis.max", numValue);
                  }
                }}
                keyboardType="numeric"
                placeholder="100"
              />
            </View>
          </>
        )}
      </View>

      {/* Colors Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Colors</Text>

        <View style={styles.cardRow}>
          <Text style={styles.label}>Line Color</Text>
          <View style={[styles.colorValueDisplay, { backgroundColor: config.lineStyle?.color || "#007AFF" }]} />
        </View>
        <ColorPicker selectedColor={config.lineStyle?.color || "#007AFF"} onSelectColor={color => updateConfig("lineStyle.color", color)} />

        {config.points?.visible && (
          <>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Point Color</Text>
              <View style={[styles.colorValueDisplay, { backgroundColor: config.points?.color || "#007AFF" }]} />
            </View>
            <ColorPicker selectedColor={config.points?.color || "#007AFF"} onSelectColor={color => updateConfig("points.color", color)} />
          </>
        )}

        {config.interactive && (
          <>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Selection Color</Text>
              <View style={[styles.colorValueDisplay, { backgroundColor: config.selection?.color || "rgba(0, 122, 255, 0.3)" }]} />
            </View>
            <ColorPicker
              selectedColor={config.selection?.color || "rgba(0, 122, 255, 0.3)"}
              onSelectColor={color => {
                // Convert to semi-transparent version for selection
                let colorValue = color;
                if (!colorValue.includes("rgba")) {
                  // Convert hex to rgba with transparency
                  const hexWithoutHash = colorValue.replace("#", "");
                  const r = parseInt(hexWithoutHash.substring(0, 2), 16);
                  const g = parseInt(hexWithoutHash.substring(2, 4), 16);
                  const b = parseInt(hexWithoutHash.substring(4, 6), 16);
                  colorValue = `rgba(${r}, ${g}, ${b}, 0.3)`;
                }
                updateConfig("selection.color", colorValue);
              }}
            />
          </>
        )}
      </View>

      {/* Points Card */}
      <View style={styles.card}>
        <View style={styles.cardRowSpaced}>
          <Text style={styles.cardTitle}>Points</Text>
          <Switch value={config.points?.visible ?? true} onValueChange={value => updateConfig("points.visible", value)} trackColor={{ false: "#d3d3d3", true: "#007AFF50" }} thumbColor={config.points?.visible ? "#007AFF" : "#f4f3f4"} />
        </View>

        {config.points?.visible && (
          <View style={styles.cardRow}>
            <Text style={styles.label}>Point Size</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.compactSlider}
                minimumValue={2}
                maximumValue={12}
                step={1}
                value={config.points?.size || 6}
                onValueChange={value => updateConfig("points.size", value)}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#DEDEDE"
              />
              <Text style={styles.sliderValue}>{config.points?.size || 6}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Interactive Card */}
      <View style={styles.card}>
        <View style={styles.cardRowSpaced}>
          <View>
            <Text style={styles.cardTitle}>Interactive Mode</Text>
            <Text style={styles.description}>Tap and drag to view data points</Text>
          </View>
          <Switch value={config.interactive ?? true} onValueChange={value => updateConfig("interactive", value)} trackColor={{ false: "#d3d3d3", true: "#007AFF50" }} thumbColor={config.interactive ? "#007AFF" : "#f4f3f4"} />
        </View>
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
  colorPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorOptionSelected: {
    borderWidth: 2,
    borderColor: "#333",
  },
  description: {
    fontSize: 12,
    color: "#888",
  },
  interactiveToggle: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  segmentedContainer: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#007AFF",
    height: 30,
  },
  segmentOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderRightColor: "#007AFF",
    borderLeftWidth: 0.5,
    borderLeftColor: "#007AFF",
  },
  segmentOptionFirst: {
    borderLeftWidth: 0,
  },
  segmentOptionLast: {
    borderRightWidth: 0,
  },
  segmentOptionSelected: {
    backgroundColor: "#007AFF",
  },
  segmentText: {
    fontSize: 13,
    color: "#007AFF",
  },
  segmentTextSelected: {
    color: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardRow: {
    marginVertical: 8,
  },
  cardRowSpaced: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  compactSlider: {
    flex: 1,
    height: 30,
  },
  sliderValue: {
    width: 30,
    textAlign: "right",
    fontSize: 14,
    color: "#777",
  },
  colorValueDisplay: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "flex-end",
  },
  numberInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    width: 80,
    textAlign: "right",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 13,
    color: "#555",
    marginRight: 8,
  },
});
