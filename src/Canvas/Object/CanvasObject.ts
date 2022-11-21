import p5 from 'p5';
import { AxisObject, GridObject, OrientationObject, ScaleObject } from 'building-editor-2d/Canvas/Object';
import { ObjectColorSet } from 'building-editor-2d/types';

export class CanvasObject  {
    isVisible = true;
    grid: GridObject;
    axis: AxisObject;
    scaleBar: ScaleObject;
    orientation: OrientationObject;

    constructor(grid = new GridObject(), axis = new AxisObject(), scaleBar = new ScaleObject(), orientation = new OrientationObject()) {
        this.grid = grid;
        this.axis = axis;
        this.scaleBar = scaleBar;
        this.orientation = orientation;
    }

    draw(p5: p5, color: ObjectColorSet, scale: number): void {
        if (this.isVisible) {
            if (this.grid.isVisible) {
                this.grid.draw(p5, color.grid, scale);
            }
            if (this.axis.isVisible) {
                this.axis.draw(p5, color.axis, scale);
            }
            if (this.scaleBar.isVisible) {
                this.scaleBar.draw(p5, color.scaleBar, scale);
            }
            if (this.orientation.isVisible) {
                this.orientation.draw(p5, color.orientation, scale);
            }
        }
    }
}
