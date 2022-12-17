import React, { useState, useContext, useMemo } from 'react';

interface SidebarState {
  open: boolean,
  setOpen: (open: boolean) => void,
  handleOpen: () => void,
  handleClose: () => void,
}

const initialState: SidebarState = {
  open: false,
  setOpen: () => { return; },
  handleOpen: () => { return; },
  handleClose: () => { return; },
};

export const SidebarContext = React.createContext<SidebarState>(initialState);

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps): React.ReactElement {
  const [open, setOpen] = useState<boolean>(initialState.open);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const sidebarState = useMemo((): SidebarState => {
    return {
      open,
      setOpen,
      handleOpen,
      handleClose,
    };
  }, [open]);

  return <SidebarContext.Provider value={sidebarState}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext(): SidebarState {
  return useContext(SidebarContext);
}
