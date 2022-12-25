import React, { useState, useContext, useMemo } from 'react';
import { CanvasDocument, CanvasInfo, Layer } from '../../src/Canvas';
import { CanvasObject } from '../../src/Canvas/Object';
import { SnapMode } from '../../src/types';

interface EditPlansState {
  floor: string;
  setFloor: (floor: string) => void;
  northAxis: number;
  northAxisError: string;
  setNorthAxis: (northAxis: number) => void;
  editFunction: string;
  setEditFunction: (editFunction: string) => void;
  snapMode: SnapMode;
  setSnapMode: (snapMode: SnapMode) => void;
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
  document: CanvasDocument;
  setDocument: (document: CanvasDocument) => void;
  active: boolean;
  setActive: (editorActive: boolean) => void;
}

const initialState: EditPlansState = {
  floor: "Layer0",
  setFloor: () => { },
  northAxis: 0,
  northAxisError: '',
  setNorthAxis: () => { },
  editFunction: 'AddRectangle',
  setEditFunction: () => { },
  snapMode: { endPoint: true, near: false, middle: false, angle: false, grid: false },
  setSnapMode: () => { },
  layers: [],
  setLayers: () => { },
  document: new CanvasDocument(new CanvasInfo(0, 0, 0), new CanvasObject(), [], []),
  setDocument: () => { },
  active: true,
  setActive: () => { },
};

export const EditPlansContext = React.createContext<EditPlansState>(initialState);

interface EditPlansProviderProps {
  children: React.ReactNode;
}

export function EditPlansProvider({ children }: EditPlansProviderProps): React.ReactElement {
  const [floor, setFloor] = useState<string>(initialState.floor);
  const [northAxis, setNorthAxis] = useState<number>(initialState.northAxis);
  const [editFunction, setEditFunction] = useState<string>(initialState.editFunction);
  const [snapMode, setSnapMode] = useState<SnapMode>(initialState.snapMode);
  const [layers, setLayers] = useState<Layer[]>(initialState.layers);
  const [document, setDocument] = useState<CanvasDocument>(initialState.document);
  const [active, setActive] = useState<boolean>(initialState.active);
  const northAxisError = northAxis < -180 || northAxis > 180 ? 'NorthAxis must be from -180° to 180°' : '';

  const state: EditPlansState = useMemo(() => {
    return {
      floor,
      setFloor,
      northAxis,
      northAxisError,
      setNorthAxis,
      editFunction,
      setEditFunction,
      snapMode,
      setSnapMode,
      layers,
      setLayers,
      document,
      setDocument,
      active,
      setActive,
    };
  }, [
    floor,
    northAxis, northAxisError, setNorthAxis,
    editFunction, setEditFunction,
    snapMode, setSnapMode,
    layers, setLayers,
    document, setDocument,
    active, setActive,
  ]);

  return <EditPlansContext.Provider value={state}>{children}</EditPlansContext.Provider>;
}

export function useEditPlansContext(): EditPlansState {
  return useContext(EditPlansContext);
}
