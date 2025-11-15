import React from 'react';
import { useForm } from 'react-hook-form';
import { gaussian } from '../algorithm/gaussian';
import { View, Text, TextInput, Button } from 'react-native';

type FormData = {
  a11: string; a12: string; b1: string;
  a21: string; a22: string; b2: string;
};

export default function MatrixInput2x2() {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm<FormData>();
  const [solution, setSolution] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    // pre-fill so test is easy
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
    const { solution: sol } = gaussian(A, b);
    setSolution(sol);
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>2×2 System</Text>

      {/* Row 1 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <TextInput placeholder="a11" {...register('a11')} keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginRight: 4 }} />
        <Text>x +</Text>
        <TextInput placeholder="a12" {...register('a12')} keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginHorizontal: 4 }} />
        <Text>y =</Text>
        <TextInput placeholder="b1" {...register('b1')} keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginLeft: 4 }} />
      </View>

      {/* Row 2 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TextInput placeholder="a21" {...register('a21')} keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginRight: 4 }} />
        <Text>x +</Text>
        <TextInput placeholder="a22" {...register('a22')} keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginHorizontal: 4 }} />
        <Text>y =</Text>
        <TextInput placeholder="b2" {...register('b2')} keyboardType="numeric" style={{ borderWidth: 1, width: 50, marginLeft: 4 }} />
      </View>

      <Button title="Solve" onPress={handleSubmit(onSolve)} />

      {solution && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18 }}>Solution:</Text>
          <Text>x = {solution[0]?.toFixed(3)}, y = {solution[1]?.toFixed(3)}</Text>
        </View>
      )}
    </View>
  );
}