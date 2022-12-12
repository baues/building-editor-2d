import { GeometryObject } from "../Canvas";
import { Point, Rectangle } from "../Geometry";

export class ComputeBoundingBox {
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
