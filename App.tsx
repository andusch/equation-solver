import React from 'react';
import { SafeAreaView } from 'react-native';
import MatrixInput2x2 from './src/components/MatrixInput2x2';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MatrixInput2x2 />
    </SafeAreaView>
  );
}