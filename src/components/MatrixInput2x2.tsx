import React from 'react';
import { useForm } from 'react-hook-form';
import { gaussian, Step } from '../algorithm/gaussian';
import { View, Text, TextInput, Button } from 'react-native';
import { List } from 'react-native-paper';

type FormData = {
  a11: string; a12: string; b1: string;
  a21: string; a22: string; b2: string;
};

export default function MatrixInput2x2() {
  const { setValue, getValues } = useForm<FormData>();
  const [solution, setSolution] = React.useState<number[] | null>(null);
  const [steps, setSteps] = React.useState<Step[]>([]);

  React.useEffect(() => {
    setValue('a11', '1'); setValue('a12', '2'); setValue('b1', '3');
    setValue('a21', '4'); setValue('a22', '5'); setValue('b2', '6');
  }, [setValue]);

  const onSolve = () => {
    const v = getValues();
    const A = [
      [Number(v.a11), Number(v.a12)],
      [Number(v.a21), Number(v.a22)],
    ];
    const b = [Number(v.b1), Number(v.b2)];
    const { steps: st, solution: sol } = gaussian(A, b);
    setSolution(sol);
    setSteps(st);
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>2×2 System</Text>

      {/* Row 1 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <TextInput placeholder="a11" keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginRight: 4 }} onChangeText={(t) => setValue('a11', t)} defaultValue="1" />
        <Text>x +</Text>
        <TextInput placeholder="a12" keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginHorizontal: 4 }} onChangeText={(t) => setValue('a12', t)} defaultValue="2" />
        <Text>y =</Text>
        <TextInput placeholder="b1" keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginLeft: 4 }} onChangeText={(t) => setValue('b1', t)} defaultValue="3" />
      </View>

      {/* Row 2 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TextInput placeholder="a21" keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginRight: 4 }} onChangeText={(t) => setValue('a21', t)} defaultValue="4" />
        <Text>x +</Text>
        <TextInput placeholder="a22" keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginHorizontal: 4 }} onChangeText={(t) => setValue('a22', t)} defaultValue="5" />
        <Text>y =</Text>
        <TextInput placeholder="b2" keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginLeft: 4 }} onChangeText={(t) => setValue('b2', t)} defaultValue="6" />
      </View>

      <Button title="Solve" onPress={onSolve} />

      {solution && (
        <>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 18 }}>Solution:</Text>
            <Text>x = {solution[0]?.toFixed(3)}, y = {solution[1]?.toFixed(3)}</Text>
          </View>

          {/* Step-by-step viewer */}
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
        </>
      )}
    </View>
  );
}