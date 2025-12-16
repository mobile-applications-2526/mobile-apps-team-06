import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const DimensionsHelper = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimension Data</Text>
        <Text style={styles.text}>Height: {height}</Text>
        <Text style={styles.text}>Width: {width}</Text>
        <Text style={styles.text}>Font scale: {fontScale}</Text>
        <Text style={styles.text}>Pixel ratio: {scale}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    fontSize: 20,
    marginBottom: 12,
    color: '#fff',
    fontWeight: '600',
  },
  text: {
    color: '#fff',
    marginVertical: 2,
  },
});

export default DimensionsHelper;