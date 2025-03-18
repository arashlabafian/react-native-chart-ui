import ExpoModulesCore
import SwiftUI
import Charts

// Add this extension before the ChartDataPoint struct
extension UIColor {
    convenience init?(hex: String) {
        var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        // Handle rgba format like "rgba(0, 122, 255, 0.3)"
        if hexSanitized.lowercased().hasPrefix("rgba(") && hexSanitized.hasSuffix(")") {
            let rgbaString = hexSanitized.dropFirst(5).dropLast(1)
            let components = rgbaString.components(separatedBy: ",").map { $0.trimmingCharacters(in: .whitespaces) }
            
            if components.count == 4,
               let r = Double(components[0]),
               let g = Double(components[1]),
               let b = Double(components[2]),
               let a = Double(components[3]) {
                self.init(red: CGFloat(r/255.0), green: CGFloat(g/255.0), blue: CGFloat(b/255.0), alpha: CGFloat(a))
                return
            }
            return nil
        }
        
        var rgb: UInt64 = 0
        Scanner(string: hexSanitized).scanHexInt64(&rgb)
        
        let r = CGFloat((rgb & 0xFF0000) >> 16) / 255.0
        let g = CGFloat((rgb & 0x00FF00) >> 8) / 255.0
        let b = CGFloat(rgb & 0x0000FF) / 255.0
        
        self.init(red: r, green: g, blue: b, alpha: 1.0)
    }
}

// Chart Data Model
struct ChartDataPoint: Identifiable {
    var id = UUID()
    var label: String
    var value: Double
    
    init(label: String, value: Double) {
        self.label = label
        self.value = value
    }
}

// Square shape for symbols
struct Square: Shape {
    func path(in rect: CGRect) -> Path {
        let minimumSize = min(rect.width, rect.height)
        let squareRect = CGRect(
            x: (rect.width - minimumSize) / 2,
            y: (rect.height - minimumSize) / 2,
            width: minimumSize,
            height: minimumSize
        )
        
        var path = Path()
        path.addRect(squareRect)
        return path
    }
}

// Helper SwiftUI view for rendering the chart
@available(iOS 17.0, *)
struct ChartContentView: View {
    var data: [ChartDataPoint]
    var chartType: String
    var title: String?
    var xAxisLabel: String?
    var yAxisLabel: String?
    
    // Line chart configuration as individual properties
    var interactive: Bool
    var lineColor: Color
    var lineWidth: CGFloat
    var lineInterpolation: InterpolationMethod
    var showPoints: Bool
    var pointSize: CGFloat
    var pointColor: Color
    var selectionColor: Color
    
    // Y-axis scale configuration
    var autoScaleYAxis: Bool
    var yAxisMin: Double
    var yAxisMax: Double
    
    // Selection state using native SwiftUI Charts selection
    @State private var selectedDataPoint: String? = nil
    
    // A simple array of colors to use for the pie segments
    private let colors: [Color] = [
        .blue, .green, .orange, .purple, .yellow, .red, .pink, .teal
    ]
    
    var body: some View {
        VStack {
            if let title = title, !title.isEmpty {
                Text(title)
                    .font(.headline)
                    .padding(.top, 8)
            }
            
            switch chartType {
            case "bar":
                Chart {
                    ForEach(data) { item in
                        BarMark(
                            x: .value("Category", item.label),
                            y: .value("Value", item.value)
                        )
                        .foregroundStyle(Color.blue)
                    }
                }
                .padding()
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            case "line":
                Chart {
                    ForEach(data) { item in
                        LineMark(
                            x: .value("Category", item.label),
                            y: .value("Value", item.value)
                        )
                        .foregroundStyle(lineColor)
                        .lineStyle(StrokeStyle(lineWidth: lineWidth))
                        .interpolationMethod(lineInterpolation)
                    }
                    
                    if showPoints {
                        ForEach(data) { item in
                            PointMark(
                                x: .value("Category", item.label),
                                y: .value("Value", item.value)
                            )
                            .foregroundStyle(pointColor)
                            .symbolSize(pointSize * pointSize)
                        }
                    }
                    
                    if interactive, let selectedLabel = selectedDataPoint, let point = data.first(where: { $0.label == selectedLabel }) {
                        RuleMark(
                            x: .value("Selected", point.label)
                        )
                        .foregroundStyle(selectionColor)
                        .zIndex(-1)
                        .annotation(position: .top, spacing: 10, overflowResolution: .init(x: .fit, y: .disabled)) {
                            valueSelectionPopover(for: point)
                        }
                    }
                }
                .chartYScale(domain: calculateYAxisDomain())
                .padding(.top, 40)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .chartXSelection(value: $selectedDataPoint)
                .sensoryFeedback(.selection, trigger: selectedDataPoint)
            
            case "pie":
                Chart {
                    ForEach(data.indices, id: \.self) { index in
                        let item = data[index]
                        SectorMark(
                            angle: .value("Value", item.value),
                            innerRadius: .ratio(0.2),
                            angularInset: 1
                        )
                        .foregroundStyle(colors[index % colors.count])
                    }
                }
                .chartXAxis(.hidden)
                .padding()
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                
                // Legend view
                VStack(alignment: .leading) {
                    ForEach(data.indices, id: \.self) { index in
                        let item = data[index]
                        HStack {
                            Rectangle()
                                .fill(colors[index % colors.count])
                                .frame(width: 20, height: 10)
                            Text(item.label)
                                .font(.caption)
                            Spacer()
                            Text("\(Int(item.value))")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .padding(.bottom)
            
            default:
                Text("Unsupported chart type")
                    .foregroundColor(.red)
            }
            
            if let xAxisLabel = xAxisLabel, !xAxisLabel.isEmpty {
                Text(xAxisLabel)
                    .font(.caption)
                    .padding(.top, 4)
            }
        }
        .padding(.horizontal)
    }
    
    // Calculate appropriate Y-axis domain to keep it fixed
    private func calculateYAxisDomain() -> ClosedRange<Double> {
        if !autoScaleYAxis {
            // Use manual min/max values if auto-scale is disabled
            return yAxisMin...yAxisMax
        }
        
        guard !data.isEmpty else { return 0...10 }
        
        let minValue = data.map { $0.value }.min() ?? 0
        let maxValue = data.map { $0.value }.max() ?? 10
        
        // Add padding to ensure points aren't at the edges
        let padding = (maxValue - minValue) * 0.1
        
        // Ensure we have a valid range with minimum height
        return max(0, minValue - padding)...max(maxValue + padding, minValue + 10)
    }
    
    // Value selection popover
    @ViewBuilder
    private func valueSelectionPopover(for point: ChartDataPoint) -> some View {
        VStack(alignment: .center, spacing: 6) {
            Text(point.label)
                .font(.subheadline)
                .fontWeight(.medium)
                .foregroundStyle(.primary)
            
            HStack(alignment: .firstTextBaseline, spacing: 2) {
                Text("\(Int(point.value))")
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(lineColor)
                
                if let yAxisLabel = yAxisLabel, !yAxisLabel.isEmpty {
                    Text(yAxisLabel.lowercased())
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 12)
        .background {
            RoundedRectangle(cornerRadius: 8)
                .fill(Color(UIColor.secondarySystemBackground))
                .shadow(color: Color.black.opacity(0.2), radius: 5, x: 0, y: 3)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(lineColor.opacity(0.3), lineWidth: 1)
                )
        }
    }
}

// Fallback view for iOS versions below 16.0
struct FallbackView: View {
    var message: String
    
    var body: some View {
        VStack {
            Text(message)
                .foregroundColor(.red)
                .padding()
            Text("This feature requires iOS 17.0 or later")
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
}

class ReactNativeChartUiView: ExpoView {
    private var hostController: UIViewController?
    private var chartData: [ChartDataPoint] = []
    private var chartType: String = "bar"
    private var chartTitle: String?
    private var xAxisLabel: String?
    private var yAxisLabel: String?
    
    // Individual properties for line chart configuration
    private var isInteractive: Bool = true
    private var lineColorHex: String = "#007AFF"
    private var lineWidthValue: Double = 2.0
    private var lineInterpolationValue: String = "curved"
    private var showPointsValue: Bool = true
    private var pointSizeValue: Double = 6.0
    private var pointColorHex: String = "#007AFF"
    private var selectionColorHex: String = "rgba(0, 122, 255, 0.3)"
    
    // Y-axis scale configuration
    private var autoScaleYAxisValue: Bool = true
    private var yAxisMinValue: Double = 0
    private var yAxisMaxValue: Double = 100
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        setupView()
    }
    
    private func setupView() {
        if #available(iOS 17.0, *) {
            let hostingController = UIHostingController(rootView: createChartView())
            
            hostingController.view.backgroundColor = .clear
            addSubview(hostingController.view)
            
            // Make view fill the container
            hostingController.view.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                hostingController.view.leadingAnchor.constraint(equalTo: leadingAnchor),
                hostingController.view.trailingAnchor.constraint(equalTo: trailingAnchor),
                hostingController.view.topAnchor.constraint(equalTo: topAnchor),
                hostingController.view.bottomAnchor.constraint(equalTo: bottomAnchor)
            ])
            
            self.hostController = hostingController
        } else {
            let fallbackController = UIHostingController(rootView: FallbackView(
                message: "Charts require iOS 17.0 or later"
            ))
            
            fallbackController.view.backgroundColor = .clear
            addSubview(fallbackController.view)
            
            fallbackController.view.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                fallbackController.view.leadingAnchor.constraint(equalTo: leadingAnchor),
                fallbackController.view.trailingAnchor.constraint(equalTo: trailingAnchor),
                fallbackController.view.topAnchor.constraint(equalTo: topAnchor),
                fallbackController.view.bottomAnchor.constraint(equalTo: bottomAnchor)
            ])
            
            self.hostController = fallbackController
        }
    }
    
    @available(iOS 17.0, *)
    private func createChartView() -> ChartContentView {
        // Convert properties to SwiftUI types
        let lineColor = Color(UIColor(hex: lineColorHex) ?? .systemBlue)
        let pointColor = Color(UIColor(hex: pointColorHex) ?? .systemBlue)
        let selectionColor = Color(UIColor(hex: selectionColorHex) ?? .systemBlue.withAlphaComponent(0.3))
        let interpolation: InterpolationMethod = lineInterpolationValue == "linear" ? .linear : .catmullRom
        
        return ChartContentView(
            data: chartData,
            chartType: chartType,
            title: chartTitle,
            xAxisLabel: xAxisLabel,
            yAxisLabel: yAxisLabel,
            interactive: isInteractive,
            lineColor: lineColor,
            lineWidth: CGFloat(lineWidthValue),
            lineInterpolation: interpolation,
            showPoints: showPointsValue,
            pointSize: CGFloat(pointSizeValue),
            pointColor: pointColor,
            selectionColor: selectionColor,
            autoScaleYAxis: autoScaleYAxisValue,
            yAxisMin: yAxisMinValue,
            yAxisMax: yAxisMaxValue
        )
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        hostController?.view.frame = bounds
    }
    
    func setChartData(_ data: [ChartDataPoint]) {
        self.chartData = data
        updateChartView()
    }
    
    func setChartType(_ type: String) {
        self.chartType = type
        updateChartView()
    }
    
    func setTitle(_ title: String) {
        self.chartTitle = title
        updateChartView()
    }
    
    func setXAxisLabel(_ label: String) {
        self.xAxisLabel = label
        updateChartView()
    }
    
    func setYAxisLabel(_ label: String) {
        self.yAxisLabel = label
        updateChartView()
    }
    
    // Individual setters for each configuration property
    func setInteractive(_ interactive: Bool) {
        self.isInteractive = interactive
        updateChartView()
    }
    
    func setLineColor(_ color: String) {
        self.lineColorHex = color
        updateChartView()
    }
    
    func setLineWidth(_ width: Double) {
        self.lineWidthValue = width
        updateChartView()
    }
    
    func setLineInterpolation(_ interpolation: String) {
        self.lineInterpolationValue = interpolation
        updateChartView()
    }
    
    func setShowPoints(_ show: Bool) {
        self.showPointsValue = show
        updateChartView()
    }
    
    func setPointSize(_ size: Double) {
        self.pointSizeValue = size
        updateChartView()
    }
    
    func setPointColor(_ color: String) {
        self.pointColorHex = color
        updateChartView()
    }
    
    func setSelectionColor(_ color: String) {
        self.selectionColorHex = color
        updateChartView()
    }
    
    // Y-axis scale setters
    func setAutoScaleYAxis(_ autoScale: Bool) {
        self.autoScaleYAxisValue = autoScale
        updateChartView()
    }
    
    func setYAxisMin(_ min: Double) {
        self.yAxisMinValue = min
        updateChartView()
    }
    
    func setYAxisMax(_ max: Double) {
        self.yAxisMaxValue = max
        updateChartView()
    }
    
    private func updateChartView() {
        if #available(iOS 17.0, *) {
            if let hostingController = hostController as? UIHostingController<ChartContentView> {
                hostingController.rootView = createChartView()
            } else {
                setupView()
            }
        }
    }
}
