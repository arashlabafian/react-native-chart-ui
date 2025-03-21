import ExpoModulesCore

public class ReactNativeChartUiModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReactNativeChartUi')` in JavaScript.
    Name("ReactNativeChartUi")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "CHART_TYPES": [
        "BAR": "bar",
        "LINE": "line",
        "PIE": "pie"
      ],
      "SUPPORTED_IOS_VERSION": [
        "BAR": 17.0,
        "LINE": 17.0,
        "PIE": 17.0
      ]
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange", "onChartLoad")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }
    
    // Function to check available chart types based on iOS version
    AsyncFunction("getAvailableChartTypes") { () -> [String: String] in
      var availableTypes: [String: String] = [:]
      
      if #available(iOS 17.0, *) {
        availableTypes["BAR"] = "bar"
        availableTypes["LINE"] = "line"
        availableTypes["PIE"] = "pie"
      }
      
      return availableTypes
    }

    // Enables the module to be used as a native view
    View(ReactNativeChartUiView.self) {
      // Define props for the chart
      Prop("data") { (view: ReactNativeChartUiView, data: [[String: Any]]) in
        let chartData = data.compactMap { dataPoint -> ChartDataPoint? in
          guard let label = dataPoint["label"] as? String,
                let value = dataPoint["value"] as? Double else {
            return nil
          }
          return ChartDataPoint(label: label, value: value)
        }
        view.setChartData(chartData)
      }
      
      Prop("chartType") { (view: ReactNativeChartUiView, chartType: String) in
        view.setChartType(chartType)
      }
      
      Prop("title") { (view: ReactNativeChartUiView, title: String) in
        view.setTitle(title)
      }
      
      // Optional props for axis labels
      Prop("xAxisLabel") { (view: ReactNativeChartUiView, label: String) in
        view.setXAxisLabel(label)
      }
      
      Prop("yAxisLabel") { (view: ReactNativeChartUiView, label: String) in
        view.setYAxisLabel(label)
      }
      
      // Line chart specific props
      Prop("interactive") { (view: ReactNativeChartUiView, interactive: Bool) in
        view.setInteractive(interactive)
      }
      
      // Replace nested objects with individual properties
      // Line style props
      Prop("lineColor") { (view: ReactNativeChartUiView, color: String) in
        view.setLineColor(color)
      }
      
      Prop("lineWidth") { (view: ReactNativeChartUiView, width: Double) in
        view.setLineWidth(width)
      }
      
      Prop("lineInterpolation") { (view: ReactNativeChartUiView, interpolation: String) in
        view.setLineInterpolation(interpolation)
      }
      
      // Points configuration
      Prop("showPoints") { (view: ReactNativeChartUiView, show: Bool) in
        view.setShowPoints(show)
      }
      
      Prop("pointSize") { (view: ReactNativeChartUiView, size: Double) in
        view.setPointSize(size)
      }
      
      Prop("pointColor") { (view: ReactNativeChartUiView, color: String) in
        view.setPointColor(color)
      }
      
      // Selection configuration
      Prop("selectionColor") { (view: ReactNativeChartUiView, color: String) in
        view.setSelectionColor(color)
      }
      
      // Y-axis scale configuration
      Prop("autoScaleYAxis") { (view: ReactNativeChartUiView, autoScale: Bool) in
        view.setAutoScaleYAxis(autoScale)
      }
      
      Prop("yAxisMin") { (view: ReactNativeChartUiView, min: Double) in
        view.setYAxisMin(min)
      }
      
      Prop("yAxisMax") { (view: ReactNativeChartUiView, max: Double) in
        view.setYAxisMax(max)
      }
    }
  }
}
