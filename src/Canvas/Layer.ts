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

    static IndexColor(index: number): string {
        if (index >= colorList.length) {
            return colorList[index % colorList.length];
        }
        return colorList[index];
    }
}
