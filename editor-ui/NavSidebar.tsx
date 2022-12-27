import React from 'react';
import Tabs from '@mui/material/Tabs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LayerContainer } from './LayerContainer';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./Sidebar'), {
  ssr: false,
});

export function DnDContent(): React.ReactElement {
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      textColor="secondary"
      value={false}
      aria-label="Floor Navigation"
      sx={{
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'transparent', overflow: 'auto',
      }}
    >
      <LayerContainer />
    </Tabs>
  );
}

export default function NavSidebar(): React.ReactElement {
  return (
    <Sidebar anchor="left" swipeable={false}>
      <DndProvider backend={HTML5Backend}>
        <DnDContent />
      </DndProvider>
    </Sidebar>
  );
}
