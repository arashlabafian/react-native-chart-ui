import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeChartUiViewProps } from './ReactNativeChartUi.types';

const NativeView: React.ComponentType<ReactNativeChartUiViewProps> =
  requireNativeView('ReactNativeChartUi');

export default function ReactNativeChartUiView(props: ReactNativeChartUiViewProps) {
  return <NativeView {...props} />;
}
