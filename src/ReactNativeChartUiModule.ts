import { requireNativeModule } from "expo-modules-core";
import { Platform } from "react-native";

import { ChangeEventPayload, OnChartLoadEventPayload } from "./ReactNativeChartUi.types";

/**
 * ReactNativeChartUi Native Module Interface
 * Provides methods for interacting with the native chart implementation
 */
interface ReactNativeChartUiModule {
  /**
   * Get the version of the native chart module
   */
  getVersion(): Promise<string>;

  /**
   * Event listeners
   */
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

let nativeModule: ReactNativeChartUiModule | null = null;

// Load the native module only if we're on a supported platform
if (Platform.OS !== "web") {
  try {
    nativeModule = requireNativeModule("ReactNativeChartUi");
  } catch (error) {
    console.warn("The native ReactNativeChartUi module is not available. " + "Make sure the expo-module-react-native-chart-ui is properly installed and linked.");
  }
}

export default nativeModule;
