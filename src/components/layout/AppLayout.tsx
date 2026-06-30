import { useState, useCallback, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { SelectedListPanel } from "@/components/list/SelectedListPanel";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleToggleList = useCallback(() => {
    setIsListOpen((prev) => !prev);
  }, []);

  const handleCloseList = useCallback(() => {
    setIsListOpen(false);
  }, []);

  return (
    <div className="app-layout">
      <Navbar onToggleList={handleToggleList} isListOpen={isListOpen} />
      <main className="app-main" role="main">
        {children}
      </main>
      <SelectedListPanel isOpen={isListOpen} onClose={handleCloseList} />
    </div>
  );
}
