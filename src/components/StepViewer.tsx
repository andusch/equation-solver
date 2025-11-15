import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import { Step } from '../algorithm/gaussian';

type Props = { steps: Step[] };

export default function StepViewer({ steps }: Props) {
  if (!steps.length) return null;

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Row operations:</Text>
      {steps.map((s, idx) => (
        <List.Accordion key={idx} title={s.operation} style={{ backgroundColor: '#f5f5f5' }}>
          <View style={{ paddingLeft: 16, paddingBottom: 8 }}>
            {s.matrix.map((row, ri) => (
              <Text key={ri}>{row.map(v => v.toFixed(2)).join('  ')}</Text>
            ))}
          </View>
        </List.Accordion>
      ))}
    </View>
  );
}