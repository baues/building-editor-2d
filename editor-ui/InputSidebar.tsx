import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useEditPlansContext } from './EditPlansContext';
import { Autocomplete, IconButton, Tooltip } from '@mui/material';
import { BorderColor, FitScreen, TransitEnterexit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import { editorFunction } from '../src/EditorFunction';

const Sidebar = dynamic(() => import('./Sidebar'), {
  ssr: false,
});

type SnapModeControlProp = {
  name: string;
  label: string;
  checked: boolean;
};

function NorthAxisInput(): JSX.Element {
  const { northAxis, northAxisError, setNorthAxis } = useEditPlansContext();

  return <TextField
    id="northAxis"
    label='north-axis'
    type="number"
    variant="outlined"
    required
    size='small'
    error={!!northAxisError}
    helperText={northAxisError}
    value={northAxis}
    onChange={(e) => setNorthAxis(Number(e.target.value))} />;
}

function SnapModeControl(prop: SnapModeControlProp): JSX.Element {
  const { snapMode, setSnapMode } = useEditPlansContext();

  return (
    <FormControlLabel
      label={prop.label}
      control={<Checkbox
        name={prop.name}
        size="small"
        checked={prop.checked}
        onChange={(e) => setSnapMode({ ...snapMode, [e.target.name]: e.target.checked })} />}
    />
  );
}

function SnapModeCheckBoxes(): JSX.Element {
  const { snapMode } = useEditPlansContext();
  const { endPoint, near, middle, grid, angle } = snapMode;

  return <FormControl component="fieldset">
    <FormLabel component="legend">SnapMode</FormLabel>
    <FormGroup>
      <Box>
        <SnapModeControl name="endPoint" label="EndPoint" checked={endPoint} />
        <SnapModeControl name="middle" label="Middle" checked={middle} />
        <SnapModeControl name="near" label="Near" checked={near} />
        <SnapModeControl name="grid" label="Grid" checked={grid} />
        <SnapModeControl name="angle" label="Angle" checked={angle} />
      </Box>
    </FormGroup>
  </FormControl>;
}

function EditFunctionButtons(): JSX.Element {
  const { editFunction, setEditFunction } = useEditPlansContext();

  function clickEditFunctionIcon(command: string): void {
    setEditFunction(command);
    (document.getElementById('functionCLI') as HTMLInputElement).value = command;
  }

  return (
    <Box>
      <Tooltip title={editorFunction['Select'].caption}>
        <IconButton onClick={() => clickEditFunctionIcon('Select')}>
          {editFunction === "Select" ? <TransitEnterexit color='secondary' /> : <TransitEnterexit />}
        </IconButton>
      </Tooltip>
      <Tooltip title={editorFunction['ZoomExtendAll'].caption}>
        <IconButton onClick={() => clickEditFunctionIcon('ZoomExtendAll')}>
          {editFunction === "ZoomExtendAll" ? <FitScreen color='secondary' /> : <FitScreen />}
        </IconButton>
      </Tooltip>
      <Tooltip title={editorFunction['AddRectangle'].caption}>
        <IconButton onClick={() => clickEditFunctionIcon('AddRectangle')}>
          {editFunction === "AddRectangle" ? <BorderColor color='secondary' /> : <BorderColor />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function EditFunctionCLI(): JSX.Element {
  const { setEditFunction, setActive } = useEditPlansContext();

  function changeCommand(command: string): void {
    const isCommandExist = editorFunction[command] === undefined ? false : true;
    if (isCommandExist) {
      setEditFunction(command);
    } else if (command === "" || command === null) {
    } else {
      alert('command-not-found' + command);
    }
  }

  const commandList: string[] = Object.keys(editorFunction).filter((key) => editorFunction[key].isCommand === true);

  return (
    <Box>
      <Autocomplete
        id="functionCLI"
        clearOnEscape
        autoComplete
        includeInputInList
        freeSolo
        size='small'
        options={commandList}
        onFocus={() => setActive(false)}
        onBlur={() => setActive(true)}
        onChange={(_event, value) => changeCommand(value!)}
        renderInput={(params) => <TextField
          {...params}
          label='function-cli'
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />}
      />
    </Box>
  );
}

export default function InputSidebar(): React.ReactElement {

  return (
    <Sidebar anchor="right">
      <Stack direction="column" spacing={2}>
        <NorthAxisInput />
        <EditFunctionCLI />
        <EditFunctionButtons />
        <SnapModeCheckBoxes />
      </Stack>
    </Sidebar>
  );
}
