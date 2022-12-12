import p5 from 'p5';
import { CanvasDocument } from './Canvas';
import { snap, zoomExtendAll, addRectangle, panCanvas, selectGeometry } from './Function';
import { Vector } from './Geometry';

interface EditorFunction {
    [key: string]: {
        caption: string;
        isCommand: boolean;
        func: (p5: p5, doc: CanvasDocument, args: any) => void;
    };
}

const editorFunction: EditorFunction = {
    'Snap': {
        caption: 'Set Snap Information',
        isCommand: false,
        func: function (p: p5, doc: CanvasDocument): void {
            snap(doc, p);
        },
    },
    'PanCanvas': {
        caption: 'Pan Canvas',
        isCommand: false,
        func: function (p: p5, doc: CanvasDocument, vec: Vector): void {
            panCanvas(doc, p, vec);
        },
    },
    'Select': {
        caption: 'Select Geometry',
        isCommand: true,
        func: function (p: p5, doc: CanvasDocument): void {
            selectGeometry(doc, p);
        },
    },
    'AddRectangle': {
        caption: "Add Rectangle",
        isCommand: true,
        func: function (p: p5, doc: CanvasDocument): void {
            addRectangle(doc, p);
        },
    },
    'ZoomExtendAll': {
        caption: "Zoom Extend All",
        isCommand: true,
        func: function (p: p5, doc: CanvasDocument): void {
            zoomExtendAll(doc);
        },
    },
};

export { editorFunction };
