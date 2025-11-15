import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { gaussian, Step } from "../algorithm/gaussian";
import { useSystems, SavedSystem } from "../hooks/useSystems";
import {
  TextInput as PaperInput,
  Button as PaperButton,
  List,
  IconButton,
} from "react-native-paper";

export default function DynamicMatrixInput() {
  const [size, setSize] = React.useState(2);
  const [matrix, setMatrix] = React.useState<number[][]>([]);
  const [solution, setSolution] = React.useState<number[] | null>(null);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const { systems, save, load, remove } = useSystems();
  const [saveName, setSaveName] = React.useState("");

  // build empty augmented matrix when size changes
  React.useEffect(() => {
    const m = Array.from({ length: size }, () => Array(size + 1).fill(0));
    setMatrix(m);
    setSolution(null);
    setSteps([]);
  }, [size]);

  const updateCell = (r: number, c: number, v: string) => {
    const m = matrix.map((row) => [...row]);
    m[r][c] = Number(v) || 0;
    setMatrix(m);
  };

  const onSolve = () => {
    const A = matrix.map((row) => row.slice(0, size));
    const b = matrix.map((row) => row[size]);
    const { steps: st, solution: sol } = gaussian(A, b);
    setSolution(sol);
    setSteps(st);
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 20 }}>Size: {size}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <PaperInput
          placeholder="System name"
          value={saveName}
          onChangeText={setSaveName}
          style={{ flex: 1, marginRight: 8 }}
        />
        <PaperButton
          mode="contained"
          onPress={() => {
            if (!saveName.trim()) return;
            save(saveName.trim(), size, matrix);
            setSaveName("");
          }}
        >
          Save
        </PaperButton>
      </View>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={2}
        maximumValue={6}
        step={1}
        value={size}
        onValueChange={(v) => setSize(Math.round(v))}
      />

      {/* Grid of inputs */}
      {matrix.map((row, r) => (
        <View key={r} style={{ flexDirection: "row", marginVertical: 4 }}>
          {row.map((_, c) => (
            <TextInput
              key={c}
              keyboardType="numeric"
              placeholder={c === size ? "b" : `a`}
              style={{ borderWidth: 1, width: 50, marginRight: 4 }}
              onChangeText={(txt) => updateCell(r, c, txt)}
            />
          ))}
        </View>
      ))}

      <Button title="Solve" onPress={onSolve} />

      {solution && (
        <>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 18 }}>Solution:</Text>
            <Text>
              {solution.map((x, i) => `x${i + 1} = ${x.toFixed(3)}`).join(", ")}
            </Text>
          </View>

          <List.AccordionGroup>
            {steps.map((s, idx) => (
              <List.Accordion
                key={idx}
                title={s.operation}
                id={`${idx}`}
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <View style={{ paddingLeft: 16, paddingBottom: 8 }}>
                  {s.matrix.map((row, ri) => (
                    <Text key={ri}>
                      {row.map((v) => v.toFixed(2)).join("  ")}
                    </Text>
                  ))}
                </View>
              </List.Accordion>
            ))}
          </List.AccordionGroup>
        </>
      )}
      {systems.length > 0 && (
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>Saved systems</Text>
          {systems.map((s) => (
            <List.Item
              key={s.name}
              title={s.name}
              description={`${s.size}×${s.size}`}
              right={() => (
                <IconButton icon="delete" onPress={() => remove(s.name)} />
              )}
              onPress={() => {
                setSize(s.size);
                setMatrix(s.matrix.map((r) => [...r]));
                setSolution(null);
                setSteps([]);
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
