import { useCallback, useEffect, useState } from 'react';
import { LayerItem } from './LayerItem';
import update from 'immutability-helper';
import { useEditPlansContext } from './EditPlansContext';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Layer } from "../src/Canvas";

// FIXME: これまでの最大のレイヤーインデックスを保存している。もっと良い書き方がありそう
let layerIndex = 0;

export function LayerContainer(): React.ReactElement {
    const { floor, layers, setLayers } = useEditPlansContext();
    const [layerItems, setLayerItems] = useState<Layer[]>(layers);
    //FIXME: レイヤーをアップデートするときのみに使っていて、数字に意味はないので上の2つだけでうまくRedrawできないか？
    const [num, setNum] = useState(0);

    useEffect(() => {
        setLayerItems(layers);
    }, [layers]);

    const moveLayer = useCallback((dragIndex: number, hoverIndex: number) => {
        setLayerItems((prevLayers: Layer[]) =>
            update(prevLayers, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevLayers[dragIndex] as Layer],
                ],
            }),
        );
    }, []);

    const renderLayer = useCallback(
        (layer: Layer, index: number) => {
            return <LayerItem
                key={index}
                index={index}
                layer={layer}
                moveLayer={moveLayer}
            />;
        }, [moveLayer]);

    return (
        <div style={{ padding: "3%" }}>
            {layerItems.map((layer, index) => renderLayer(layer, index))}
            <Button
                sx={{ margin: '3%', width: '100px' }}
                variant="text"
                color="secondary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => {
                    const indexList = layers.map(layer => layer.index);
                    indexList.push(layerIndex);
                    layerIndex = Math.max(...indexList) + 1;
                    layers.push(new Layer("Layer" + layerIndex, true, layerIndex, 3, false, Layer.IndexColor(layerIndex)));
                    setLayers(layers);
                    setLayerItems(layers);
                    setNum(num + 1);
                }}
            />
            <Button
                sx={{ margin: '3%', width: '100px' }}
                variant="text"
                color="secondary"
                startIcon={<RemoveCircleOutlineIcon />}
                onClick={() => {
                    const res = confirm('delete-layer' + " \"" + floor + "\"");
                    if (res) {
                        setLayers(layers.filter(layer => layer.name !== floor));
                        setNum(num - 1);
                    }
                }}
            />
        </div>
    );
}