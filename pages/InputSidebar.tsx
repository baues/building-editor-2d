import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Sidebar from './Sidebar';
import { useEditPlansContext } from './EditPlansContext';
import { Autocomplete, IconButton, Tooltip } from '@mui/material';
import { BorderColor, FitScreen, TransitEnterexit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { editorFunction } from '../src/EditorFunction';

type SnapModeControlProp = {
  name: string;
  label: string;
  checked: boolean;
};

function NorthAxisInput(): JSX.Element {
  const { northAxis, northAxisError, setNorthAxis } = useEditPlansContext();

  if (northAxis === '') {
    setNorthAxis(0);
  }

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
    onChange={(e) => setNorthAxis(e.target.value ? Number(e.target.value) : '')} />;
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
    <FormLabel component="legend">snap-mode</FormLabel>
    <FormGroup>
      <Box>
        <SnapModeControl name="endPoint" label="snap-mode-end-point" checked={endPoint} />
        <SnapModeControl name="middle" label="snap-mode-middle" checked={middle} />
        <SnapModeControl name="near" label="snap-mode-near" checked={near} />
        <SnapModeControl name="grid" label="snap-mode-grid" checked={grid} />
        <SnapModeControl name="angle" label="snap-mode-angle" checked={angle} />
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
