import React from 'react';
import { SafeAreaView } from 'react-native';
import DynamicMatrixInput from './src/components/DynamicMatrixInput';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DynamicMatrixInput />
    </SafeAreaView>
  );
}