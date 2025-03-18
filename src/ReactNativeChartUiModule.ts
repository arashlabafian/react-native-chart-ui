import { requireNativeModule } from "expo-modules-core";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const ReactNativeChartUiModule = requireNativeModule("ReactNativeChartUi") as {
  readonly CHART_TYPES: {
    readonly BAR: string;
    readonly LINE: string;
    readonly PIE: string;
  };
  readonly SUPPORTED_IOS_VERSION: {
    readonly BAR: number;
    readonly LINE: number;
    readonly PIE: number;
  };
  getAvailableChartTypes(): Promise<{
    readonly BAR?: string;
    readonly LINE?: string;
    readonly PIE?: string;
  }>;
};

export default ReactNativeChartUiModule;
