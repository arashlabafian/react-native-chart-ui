import { useEvent } from "expo";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, SafeAreaView, View } from "react-native";

import { ChartExample } from "./src/components/ChartExample";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>React Native Chart UI</Text>

      <View style={styles.chartContainer}>
        <ChartExample title="Interactive Chart Example" initialType="bar" />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.spacer} />

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
  chartContainer: {
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  spacer: {
    height: 450, // Adjusted to account for the entire ChartExample component height
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
