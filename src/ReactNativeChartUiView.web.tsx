import * as React from 'react';

import { ReactNativeChartUiViewProps } from './ReactNativeChartUi.types';

export default function ReactNativeChartUiView(props: ReactNativeChartUiViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
