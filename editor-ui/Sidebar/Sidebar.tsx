import React from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useMobile } from './useWindowSize';
import { SidebarProvider, useSidebarContext } from './SidebarContext';

export const baseSidebarWidth = 240;

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  children: React.ReactNode;
  title?: string;
  width?: number;
  anchor?: 'right' | 'left';
  swipeable?: boolean;
  drawerProps?: DrawerProps;
}

function SidebarContent({ children, title, width, anchor = 'right', swipeable = true, drawerProps }: Props): React.ReactElement {
  const theme = useTheme();
  const mobile = useMobile();
  const { open, handleOpen, handleClose } = useSidebarContext();
  const sidebarWidth = width || baseSidebarWidth;

  if (mobile && anchor === 'left') {
    return (
      <>
        <Fab style={{ position: 'fixed', bottom: theme.spacing(2), right: theme.spacing(2), zIndex: theme.zIndex.mobileStepper + 1 }} color="primary" aria-label={title} onClick={handleOpen}>
          <MenuOpenIcon />
        </Fab>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} {...drawerProps}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" size="large">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{ maxHeight: window.innerHeight - (Number(theme.mixins.toolbar.minHeight) || 56), overflowX: 'hidden', overflowY: swipeable ? 'auto' : undefined }}>{children}</div>
        </Dialog>
      </>
    );
  }

  return (
    <Drawer
      sx={{ width: sidebarWidth, flexShrink: 0 }}
      variant="permanent"
      PaperProps={{
        style: {
          maxHeight: window.innerHeight,
          height: swipeable ? window.innerHeight : 'auto',
          width: sidebarWidth,
          backgroundColor: 'transparent',
          border: 'none',
          zIndex: theme.zIndex.mobileStepper - 1,
        },
      }}
      anchor={anchor}
      {...drawerProps}
    >
      <Toolbar />
      <Box style={{ overflowY: swipeable ? 'auto' : 'hidden', maxHeight: window.innerHeight - (Number(theme.mixins.toolbar.minHeight) || 56), overflowX: 'hidden' }}>{children}</Box>
    </Drawer>
  );
}

export default function Sidebar(props: Props): React.ReactElement {
  return (
    <SidebarProvider>
      <SidebarContent {...props} />
    </SidebarProvider>
  );
}
