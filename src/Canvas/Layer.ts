import { AnalysisFloorGeometry } from "types";

const colorList = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "brown", "black"];

export class Layer {
    name: string
    color: string;
    index: number;
    height: number;
    isVisible = true;
    isLocked = false;

    constructor(name: string, isVisible: boolean, index: number, height = 3000, isLocked = false, color = '#000000') {
        this.name = name;
        this.isVisible = isVisible;
        this.index = index;
        this.isLocked = isLocked;
        this.height = height;

        const numColor = Number(color);
        if (isNaN(numColor) || numColor > colorList.length) {
            this.color = color;
        } else {
            this.color = colorList[numColor];
        }
    }

    //TODO: これはここではなく別のクラスにあるべき。BauesAnalysis依存とは分離したほうが良い
    static createFromFloorGeometries(floorGeometries: AnalysisFloorGeometry[], visibleFloors: string[]): Layer[] {
        const layers: Layer[] = [];

        if (visibleFloors.length === 0) {
            visibleFloors = ["Layer0"];
        }

        if (floorGeometries.length > 0) {
            for (let floor = 0; floor < floorGeometries.length; floor++) {
                const name = "Layer" + String(floorGeometries[floor].floor);
                const isVisible = visibleFloors.includes(name);
                const height = floorGeometries[floor].height;
                layers.push(new Layer(name, isVisible, layers.length, height, false, String(layers.length)));
            }
        } else {
            layers.push(new Layer('Layer0', true, 0));
        }

        return layers;
    }

    static IndexColor(index: number): string {
        if (index >= colorList.length) {
            return colorList[index % colorList.length];
        }
        return colorList[index];
    }
}
