import ExpoModulesCore
import SwiftUI
import Charts

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

// Helper SwiftUI view for rendering the chart
@available(iOS 16.0, *)
struct ChartContentView: View {
    var data: [ChartDataPoint]
    var chartType: String
    var title: String?
    var xAxisLabel: String?
    var yAxisLabel: String?
    
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
                        .foregroundStyle(Color.blue)
                        PointMark(
                            x: .value("Category", item.label),
                            y: .value("Value", item.value)
                        )
                        .foregroundStyle(Color.blue)
                    }
                }
                .padding()
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            case "pie":
                if #available(iOS 17.0, *) {
                    Chart {
                        ForEach(data.indices, id: \.self) { index in
                            let item = data[index]
                            SectorMark(
                                angle: .value("Value", item.value),
                                innerRadius: .ratio(0.2),
                                angularInset: 1
                            )
                            .foregroundStyle(colors[index % colors.count])
                            .annotation(position: .overlay) {
                                Text(item.label)
                                    .font(.caption)
                                    .foregroundColor(.white)
                            }
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
                } else {
                    Text("Pie charts require iOS 17.0 or later")
                        .foregroundColor(.red)
                }
            
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
}

// Fallback view for iOS versions below 16.0
struct FallbackView: View {
    var message: String
    
    var body: some View {
        VStack {
            Text(message)
                .foregroundColor(.red)
                .padding()
            Text("This feature requires iOS 16.0 or later")
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
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        setupView()
    }
    
    private func setupView() {
        if #available(iOS 16.0, *) {
            let hostingController = UIHostingController(rootView: ChartContentView(
                data: chartData,
                chartType: chartType,
                title: chartTitle,
                xAxisLabel: xAxisLabel,
                yAxisLabel: yAxisLabel
            ))
            
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
                message: "Charts are not available"
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
    
    private func updateChartView() {
        if #available(iOS 16.0, *) {
            if let hostingController = hostController as? UIHostingController<ChartContentView> {
                hostingController.rootView = ChartContentView(
                    data: chartData,
                    chartType: chartType,
                    title: chartTitle,
                    xAxisLabel: xAxisLabel,
                    yAxisLabel: yAxisLabel
                )
            } else {
                setupView()
            }
        }
    }
}
