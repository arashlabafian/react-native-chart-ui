import { NativeModule, requireNativeModule } from 'expo';

import { ReactNativeChartUiModuleEvents } from './ReactNativeChartUi.types';

declare class ReactNativeChartUiModule extends NativeModule<ReactNativeChartUiModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeChartUiModule>('ReactNativeChartUi');
