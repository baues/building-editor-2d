import { Rectangle } from "./Rectangle";

/**
 * ジオメトリのベースクラス
 */
export abstract class GeometryBase {
    abstract getBoundingBox(): Rectangle;
}
