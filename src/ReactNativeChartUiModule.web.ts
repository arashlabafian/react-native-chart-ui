import { registerWebModule, NativeModule } from 'expo';

import { ReactNativeChartUiModuleEvents } from './ReactNativeChartUi.types';

class ReactNativeChartUiModule extends NativeModule<ReactNativeChartUiModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ReactNativeChartUiModule);
