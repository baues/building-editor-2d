import { Snap } from '../types';
import { GeometryObject } from '.';

export class EditorState {
    snap: Snap;
    function: string;
    editingGeometry: GeometryObject[] = [];

    constructor(editFunction: string, snap: Snap) {
        this.function = editFunction;
        this.snap = snap;
    }

    static defaultSettings(): EditorState {
        const editMode = "Select";
        const snap = {
            mode: {
                endPoint: true,
                middle: false,
                near: false,
                angle: false,
                grid: false,
            },
            point: null,
            holdPoint: null,
            objectIndex: null,
        };

        return new EditorState(editMode, snap);
    }
}
