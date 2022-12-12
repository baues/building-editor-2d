import React, { FC, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";
import { Checkbox, Grid, TextField } from "@mui/material";
import { Color, ColorValue, ColorPicker } from "mui-color";
import { Layer } from "../src/Canvas";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { useEditPlansContext } from "./EditPlansContext";
import { B2DMath } from "../src/Utils";

export interface LayerProps {
    index: number;
    layer: Layer;
    moveLayer: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

const style: React.CSSProperties | undefined = {
    padding: '2.5%',
    marginBottom: '.5rem',
    cursor: 'move',
    textAlign: 'center',
    borderRadius: "10px",
    verticalAlign: 'middle',
    backgroundColor: 'rgba(0,0,10,0.05)',
};

export const LayerItem: FC<LayerProps> = ({ index, layer, moveLayer }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { floor, setFloor, layers, setLayers } = useEditPlansContext();

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: "Layer",
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveLayer(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "Layer",
        item: () => {
            return { index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.2 : 1;
    drag(drop(ref));

    // アクティブレイヤーの設定
    const activeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setFloor(layer.name);
            layer.isVisible = true;
            layer.isLocked = false;
        }
    };

    // レイヤーカラーの設定
    const [, setColor] = useState<Color>();
    const colorChange = (color: Color) => {
        setColor(color);
        layer.color = "#" + color.hex;
    };
    layer.index = index;

    // レイヤーのロックの設定
    const [, setLock] = useState<boolean>(layer.isLocked);
    const lockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLock(event.target.checked);
        layer.isLocked = event.target.checked;
    };

    // レイヤーの表示の設定
    const [, setVisible] = useState<boolean>(layer.isVisible);
    const visibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisible(event.target.checked);
        layer.isVisible = event.target.checked;
    };

    // 階高の設定
    const [, setHeight] = useState<number>(layer.height);
    const floorHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        layer.height = parseFloat(event.target.value);
        const index: number = layers.findIndex(l => l.name === layer.name);
        layers[index] = layer;
        setLayers(layers);
        setHeight(layer.height);
    };

    return (
        <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    {(layer.index + 1) + "FL: " + layer.name}
                </Grid>
                <Grid item xs={7}>
                    <TextField label={'floor-height' + "[m]"} type="number" value={B2DMath.round(layer.height, 1)} size="small" onChange={floorHeightChange}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <Checkbox icon={<EditOffIcon />} checkedIcon={<EditIcon />} checked={layer.name === floor} onChange={activeChange} />
                </Grid>
                <Grid item xs={3}>
                    <Checkbox icon={<LockOpenIcon />} checkedIcon={<LockIcon />} checked={layer.isLocked} onChange={lockChange} />
                </Grid>
                <Grid item xs={3}>
                    <Checkbox icon={<VisibilityOffIcon />} checkedIcon={<VisibilityIcon />} checked={layer.isVisible} onChange={visibleChange} />
                </Grid>
                <Grid item xs={3}>
                    <ColorPicker value={layer.color} onChange={colorChange as (color: ColorValue) => void} hideTextfield />
                </Grid>
            </Grid>
        </div>
    );
};
