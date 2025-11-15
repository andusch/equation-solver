import { useEffect, useState } from 'react';

export interface SavedSystem {
  name: string;
  size: number;
  matrix: number[][];
}

const KEY = 'gaussian-systems';

export function useSystems() {
  const [systems, setSystems] = useState<SavedSystem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSystems(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (name: string, size: number, matrix: number[][]) => {
    const next = [...systems, { name, size, matrix }];
    setSystems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const load = (s: SavedSystem) => s;
  const remove = (name: string) => {
    const next = systems.filter(s => s.name !== name);
    setSystems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  return { systems, save, load, remove };
}