import React, { useEffect } from 'react';
import p5 from 'p5';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useEditPlansContext } from './EditPlansContext';
import { P5Canvas, useP5Context } from '../src';
import { ComputeBoundingBox, CanvasScaler, Zone } from '../src/Utils';
import { CanvasInfo, CanvasDocument, GeometryObject, Layer } from '../src/Canvas';
import { AxisObject, CanvasObject, GridObject, OrientationObject, ScaleObject } from '../src/Canvas/Object';
import { editorFunction } from '../src/EditorFunction';
import { Vector } from '../src/Geometry';
import { AnalysisItemToGeometry } from '../src/Connector';

let doc: CanvasDocument = new CanvasDocument(new CanvasInfo(0, 0, 0), new CanvasObject(), [], []);

/**
 * Orientation と ScaleBar の表示の設定
 * @param isVisible
 */
function OrientationAndScaleBarVisibility(canvasDoc: CanvasDocument, isVisible: boolean) {
  canvasDoc.canvasObject.orientation.isVisible = isVisible;
  canvasDoc.canvasObject.scaleBar.isVisible = isVisible;
}

function panCanvasByMouse(p: p5) {
  if (p.mouseIsPressed) {
    OrientationAndScaleBarVisibility(doc, false);
    editorFunction['PanCanvas'].func(p, doc, null);
  } else {
    OrientationAndScaleBarVisibility(doc, true);
  }
}

function panCanvasByArrowKey(p: p5, doc: CanvasDocument) {
  const value = 10;

  if (!doc.canvasInfo.isActive) {
    return;
  }

  if (p.keyIsDown(p.DOWN_ARROW)) { // 矢印キーを押したときキャンバスを動かす
    editorFunction['PanCanvas'].func(p, doc, new Vector(0, -value));
  } else if (p.keyIsDown(p.UP_ARROW)) {
    editorFunction['PanCanvas'].func(p, doc, new Vector(0, value));
  } else if (p.keyIsDown(p.LEFT_ARROW)) {
    editorFunction['PanCanvas'].func(p, doc, new Vector(value, 0));
  } else if (p.keyIsDown(p.RIGHT_ARROW)) {
    editorFunction['PanCanvas'].func(p, doc, new Vector(-value, 0));
  }
}

/**
 * p5js の setup と draw の定義
 */
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    const info = doc.canvasInfo;

    p.resizeCanvas(info.width, info.height);
    p.clear();
    p.translate(info.canvasTranslate().x, info.canvasTranslate().y);
    p.scale(info.scale);

    if (p.keyIsDown(p.SHIFT)) {
      panCanvasByMouse(p);
    } else {
      editorFunction['Snap'].func(p, doc, []);
      const funcKey = doc.editorState.function;
      editorFunction[funcKey].func(p, doc, []);
    }

    doc.draw(p);
  };

  // キャンバスの拡大縮小
  p.mouseWheel = (event: WheelEvent) => {
    doc.canvasInfo.scale = doc.canvasInfo.scale - event.deltaY * 0.5 < 1
      ? 1
      : doc.canvasInfo.scale - event.deltaY * 0.5;
    p.scale(doc.canvasInfo.scale);
  };

  p.keyPressed = () => {
    if (p.keyIsDown(p.SHIFT)) { // 手を表示してパンモードであることを示す
      p.cursor(p.HAND);
    } else if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(p.UP_ARROW) || p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(p.RIGHT_ARROW)) {
      panCanvasByArrowKey(p, doc); // 矢印キーを押したときキャンバスを動かす
    }
  };

  p.keyReleased = () => {
    p.cursor(p.ARROW);
    return false;
  };
};

export default function EditPlansCanvas(): React.ReactElement {
  const theme = useTheme();
  const { canvasWidth, canvasHeight } = useP5Context();
  const { floor, setFloor, northAxis, northAxisError, editFunction, snapMode, layers, setLayers, setDocument, active, setActive } = useEditPlansContext();

  // キャンバスのイニシャライズ
  useEffect(() => {
    const info = new CanvasInfo(1, canvasHeight, canvasWidth);
    const bbox = AnalysisItemToGeometry.boundingBoxFromAnalysisFloorGeometries(geometry!.geometries, true);
    const scaler = new CanvasScaler(info.height, info.width);
    info.drawCenter = bbox.center();
    info.colorMode = theme.palette.mode;
    info.scale = scaler.scaleFromBoundingBox(bbox);

    const geometries: GeometryObject[] = Zone.convertZonesToPolylines(geometry!.geometries);

    const angle = (northAxisError || northAxis === '') ? 0 : northAxis;
    const orientation = new OrientationObject(angle, info.drawCenter);
    const scaleObject = new ScaleObject(info.drawCenter);
    const canvasObject = new CanvasObject(new GridObject(20, 5, 5), new AxisObject(), scaleObject, orientation);

    const layers: Layer[] = AnalysisItemToGeometry.floorGeometriesToLayer(geometry!.geometries, ["Layer0"]);
    setLayers(layers);
    info.activeLayer = String(floor);
    setFloor(floor);

    doc = new CanvasDocument(info, canvasObject, geometries, layers);
    setDocument(doc);
  }, []);

  // 編集モードの変更
  useEffect(() => {
    doc.editorState.function = editFunction;
  }, [editFunction]);

  // スナップモードの変更
  useEffect(() => {
    doc.editorState.snap.mode = snapMode;
  }, [snapMode]);

  // レイヤーの変更の対応
  useEffect(() => {
    doc.layers = layers;
  }, [layers]);

  // ウインドウのサイズ変更に伴うキャンバスのリサイズ
  useEffect(() => {
    const info = doc.canvasInfo;
    info.width = canvasWidth;
    info.height = canvasHeight;

    const bbox = ComputeBoundingBox.geometryObjects(doc.geometryObjects, false);
    const scaler = new CanvasScaler(info.height, info.width);
    info.scale = scaler.scaleFromBoundingBox(bbox);
  }, [canvasHeight, canvasWidth]);

  useEffect(() => {
    doc.canvasInfo.isActive = active;
  }, [active]);

  // 描画カラーの変更
  useEffect(() => {
    doc.canvasInfo.colorMode = theme.palette.mode;
  }, [theme.palette.mode]);

  // 階の選択による表示レイヤーの変更
  useEffect(() => {
    doc.canvasInfo.activeLayer = floor;
    doc.geometryObjects.forEach(obj => obj.isSelected = false);
  }, [floor]);

  // オリエンテーションの更新
  useEffect(() => {
    doc.canvasObject.orientation.northAngle = (northAxisError || northAxis === '') ? 0 : northAxis;
  }, [northAxis, northAxisError]);

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}>
      <P5Canvas sketch={sketch} />
    </Box>
  );
}
