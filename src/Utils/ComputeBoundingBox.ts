import { GeometryObject } from "building-editor-2d/Canvas";
import { Point, Rectangle } from "building-editor-2d/Geometry";
import { AnalysisFloorGeometry, AnalysisLine, AnalysisPoint, Floor } from "types";

export class ComputeBoundingBox {
  static zoneCoordinates(coordinates: AnalysisPoint[]): Rectangle {
    const x = coordinates.map((point) => point[0]);
    const y = coordinates.map((point) => point[1]);

    return new Rectangle(
      new Point(Math.min(...x), Math.min(...y)),
      new Point(Math.max(...x), Math.max(...y)),
    );
  }

  static analysisLines(lines: AnalysisLine[]): Rectangle {
    const x = lines.flatMap((line) => [line[0][0], line[1][0]]);
    const y = lines.flatMap((line) => [line[0][1], line[1][1]]);

    return new Rectangle(
      new Point(Math.min(...x), Math.min(...y)),
      new Point(Math.max(...x), Math.max(...y)),
    );
  }

  static allFloors(floors: Floor[]): Rectangle {
    const maxX = Math.max(
      ...floors.map((f) => (f.x ? f.x / 2 : 0) + (f.dx || 0)),
    );
    const maxY = Math.max(
      ...floors.map((f) => (f.y ? f.y / 2 : 0) + (f.dy || 0)),
    );
    const minX = Math.min(
      ...floors.map((f) => (f.x ? -f.x / 2 : 0) + (f.dx || 0)),
    );
    const minY = Math.min(
      ...floors.map((f) => (f.y ? -f.y / 2 : 0) + (f.dy || 0)),
    );

    return new Rectangle(new Point(minX, minY), new Point(maxX, maxY));
  }

  static analysisFloorGeometries(geometries: AnalysisFloorGeometry[], includeOrigin: boolean): Rectangle {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;

    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];
      if (geometry.zones) {
        geometry.zones.forEach((zone) => {
          const boundingBox = this.zoneCoordinates(zone.coordinates);
          const intervalX = boundingBox.intervalX();
          const intervalY = boundingBox.intervalY();
          maxX = intervalX.max > maxX ? intervalX.max : maxX;
          maxY = intervalY.max > maxY ? intervalY.max : maxY;
          minX = intervalX.min < minX ? intervalX.min : minX;
          minY = intervalY.min < minY ? intervalY.min : minY;
        });
      }
    }
    if (includeOrigin) {
      maxX = 0 > maxX ? 0 : maxX;
      maxY = 0 > maxY ? 0 : maxY;
      minX = 0 < minX ? 0 : minX;
      minY = 0 < minY ? 0 : minY;
    }

    return new Rectangle(new Point(minX, minY), new Point(maxX, maxY));
  }

  static geometryObjects(geometryObjects: GeometryObject[], includeOrigin: boolean): Rectangle {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;

    geometryObjects.forEach((object) => {
        const boundingBox = object.geometry.getBoundingBox();
        const intervalX = boundingBox.intervalX();
        const intervalY = boundingBox.intervalY();
        maxX = intervalX.max > maxX ? intervalX.max : maxX;
        maxY = intervalY.max > maxY ? intervalY.max : maxY;
        minX = intervalX.min < minX ? intervalX.min : minX;
        minY = intervalY.min < minY ? intervalY.min : minY;
    });
    if (includeOrigin) {
      maxX = 0 > maxX ? 0 : maxX;
      maxY = 0 > maxY ? 0 : maxY;
      minX = 0 < minX ? 0 : minX;
      minY = 0 < minY ? 0 : minY;
    }

    return new Rectangle(new Point(minX, minY), new Point(maxX, maxY));
  }
}
