"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { cn } from "./utils";

/**
 * ResizablePanelGroup
 */
function ResizablePanelGroup({
  className,
  children,
  direction = "horizontal",
}: {
  className?: string;
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
}) {
  return (
    <PanelGroup direction={direction} className={cn("flex h-full w-full", className)}>
      {children}
    </PanelGroup>
  );
}

/**
 * ResizablePanel
 */
function ResizablePanel({ children, ...props }: { children: React.ReactNode }) {
  return <Panel {...props}>{children}</Panel>;
}

/**
 * ResizableHandle
 */
function ResizableHandle({
  withHandle,
  className,
  ...props
}: {
  withHandle?: boolean;
  className?: string;
}) {
  return (
    <PanelResizeHandle
      className={cn(
        "bg-border relative flex w-px items-center justify-center",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
