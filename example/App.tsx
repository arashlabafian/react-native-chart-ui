import { useEvent } from "expo";
import React from "react";
import { ScrollView, StyleSheet, Text, SafeAreaView, View } from "react-native";

import { ChartExample } from "./src/components/ChartExample";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>React Native Chart UI</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Chart Examples</Text>
          <Text style={styles.description}>Below are examples of different chart types available. You can switch between bar, line, and pie charts and see random data updates.</Text>
        </View>

        <ChartExample title="Interactive Chart Example" initialType="bar" />

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>Note: Only iOS is supported currently. Android support coming soon.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  noteContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    margin: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  noteText: {
    fontSize: 14,
    color: "#666",
  },
});
