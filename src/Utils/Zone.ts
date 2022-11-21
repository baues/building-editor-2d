import { CanvasDocument } from 'building-editor-2d/Canvas';
import { AnalysisFloorGeometry, AnalysisZone, programKey, shadingKey, spaceTypeKey, wwrKey } from 'types';
import { PolylineObject } from '../Canvas/Object';
import { Polyline, Point } from '../Geometry';

export class Zone {

  static convertPolylineToZone(polyline: PolylineObject, index: number, fl: number): AnalysisZone {
    return {
      name: fl + '_zone' + index,
      coordinates: polyline.toAnalysisPointArray(),
      exteriorWalls: [],
      [programKey]: "office",
      [spaceTypeKey]: "office_closed",
      [wwrKey]: [],
      [shadingKey]: [],
      envelope: "concrete",
      base_wwr: 40,
      cooling_setpt: 26,
      heating_setpt: 20,
      hvac: "VRF::VRF",
      ef_ach: 0,
      ef_deltapressure: 0,
    };
  }

  static convertZonesToPolylines(geometries: AnalysisFloorGeometry[]): PolylineObject[] {
    const polylineObjs: PolylineObject[] = [];

    for (let floor = 0; floor < geometries.length; floor++) {
      const zones = geometries[floor].zones!;

      if (zones) {
        zones.forEach((zone) => {
          const polyline = new Polyline();
          const coordinates = zone.coordinates;

          for (let i = 0; i < coordinates.length; i++) {
            polyline.push(new Point(coordinates[i][0], coordinates[i][1]));
          }

          polylineObjs.push(
            new PolylineObject(polyline, zone.name, "Layer" + String(floor)),
          );
        });
      }
    }

    return polylineObjs;
  }

  static convertToAnalysisZoneGeometry(doc: CanvasDocument, analysisGeometries: AnalysisFloorGeometry[]): void {
    let level = 0;
    for (let i = 0; i < doc.layers.length; i++) {
      const layer = doc.layers[i];
      const layerName = layer.name;
      const height = layer.height;

      const analysisGeometry = {
        floor: i,
        level: level,
        height: height,
        image: "",
        zones: [],
        warning_lines: [],
      };

      if (analysisGeometries.length < i) {
        analysisGeometries.push(analysisGeometry);
      } else {
        analysisGeometries[i] = analysisGeometry;
      }

      let objIndex = 1;
      doc.geometryObjects.forEach((obj) => {
        if (obj.layerName === layerName && obj.objectType === 'Polyline') {
          const polyline = obj as PolylineObject;
          analysisGeometries[i].zones!.push(
            Zone.convertPolylineToZone(polyline, objIndex, i));
          objIndex++;
        }
      });

      level += height;
    }
  }
}
