"use client";

import {
  CommandDialog,
  CommandDialogProps,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { changeLogUrl, repoUrl } from "@/settings.json";
import {
  Edit2,
  FilePlus,
  TextCursorIcon,
  WrapText,
  ArrowLeft,
  Github,
  FileDigit,
  Type,
  Minus,
  Plus,
  Palette,
  Settings,
  Share,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";


interface SessionCommandDialogProps extends CommandDialogProps {
  onSessionChangeUsername: () => void;
  onVimMode: () => void;
  onWrapText: () => void;
  onLineNumbers: () => void;
  onSessionNew: () => void;
  onSessionShareUrl: () => void;
  onLayoutAdd: () => void;
  onLayoutRemove: () => void;
  onLayoutConfigure: () => void;
}

export default function SessionCommandDialog(props: SessionCommandDialogProps) {
  const wrapHandler = (callback: () => void) => {
    return () => {
      const { onOpenChange } = props;

      callback();
      if (onOpenChange) onOpenChange(false);
    };
  };
  const [pages, setPages] = useState([])
  const page = pages[pages.length - 1]

  return (
    <CommandDialog {...props}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          <Command>
          <CommandGroup heading="Customization">
          <CommandList className="ml-2">
            {!page && (
              <>
                <CommandItem onSelect={() => setPages([...pages, 'fonts'])}>
                  <Type className="mr-2 h-4 w-4 inline" />
                  <span>Font Family</span>
                </CommandItem>
                <CommandItem onSelect={() => setPages([...pages, 'themes'])}>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Theme</span>
                </CommandItem>
              </>
            )}
            {page === 'fonts' && (
              <>
                <CommandItem onSelect={() => setPages([])}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back to menu</span>
                </CommandItem>
                <CommandItem>
                  <Type className="mr-2 h-4 w-4 inline" />
                  <span>Iosevka</span>
                </CommandItem>
                <CommandItem>
                  <Type className="mr-2 h-4 w-4 inline" />
                  <span>Fira Mono</span>
                </CommandItem>
                <CommandItem>
                  <Type className="mr-2 h-4 w-4 inline" />
                  <span>Hasklig</span>
                </CommandItem>
              </>
            )}
            {page === 'themes' && (
              <>
                <CommandItem onSelect={() => setPages([])}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span>Back to menu</span>
                </CommandItem>
                <CommandItem>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Dracula</span>
                </CommandItem>
                <CommandItem>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Idk</span>
                </CommandItem>
              </>
            )}
            <CommandItem onSelect={wrapHandler(props.onLineNumbers)}>
               <FileDigit className="mr-2 h-4 w-4" />
               <span>Line Numbers</span>
            </CommandItem>
            <CommandItem onSelect={wrapHandler(props.onWrapText)}>
              <WrapText className="mr-2 h-4 w-4" />
              <span>Wrap Lines</span>
            </CommandItem>
            <CommandItem onSelect={wrapHandler(props.onVimMode)}>
              <TextCursorIcon className="mr-2 h-4 w-4" />
              <span>Vim Mode</span>
            </CommandItem>
          </CommandList>
          </CommandGroup>
        </Command>
        <CommandSeparator />
        <CommandGroup heading="Session">
          <CommandItem onSelect={wrapHandler(props.onSessionChangeUsername)}>
            <Edit2 className="mr-2 h-4 w-4" />
            <span>Change Username</span>
          </CommandItem>
          <CommandItem onSelect={wrapHandler(props.onSessionNew)}>
            <FilePlus className="mr-2 h-4 w-4" />
            <span>New</span>
          </CommandItem>
          <CommandItem onSelect={wrapHandler(props.onSessionShareUrl)}>
            <Share className="mr-2 h-4 w-4" />
            <span>Share URL</span>
          </CommandItem>
          {/* <CommandItem>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>Open</span>
          </CommandItem>
          <CommandItem>
            <span className="ml-7">Open Recent</span>
          </CommandItem>
          <CommandItem>
            <Save className="mr-2 h-4 w-4" />
            <span>Save As...</span>
          </CommandItem> */}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Layout">
          <CommandItem onSelect={wrapHandler(props.onLayoutConfigure)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configure</span>
            <CommandShortcut>⌃P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={wrapHandler(props.onLayoutAdd)}>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Pane</span>
          </CommandItem>
          <CommandItem onSelect={wrapHandler(props.onLayoutRemove)}>
            <Minus className="mr-2 h-4 w-4" />
            <span>Remove Pane</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          {/* <CommandItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Quickstart</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="ml-7">Show All Commands</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem> */}
          <Link to={changeLogUrl} reloadDocument target="_blank">
            <CommandItem>
              <span>Show Release Notes</span>
            </CommandItem>
          </Link>
          <Link to={repoUrl} reloadDocument target="_blank">
            <CommandItem>
              <Github className="mr-2 h-4 w-4" />
              <span>Go to GitHub</span>
            </CommandItem>
          </Link>
        </CommandGroup>
      </CommandList>
      <span className="text-xs text-slate-500 ml-3 mr-3 mt-4 mb-2">
        Tip: Press <kbd>⌘</kbd>
        <kbd>J</kbd> or <kbd>Ctrl</kbd>
        <kbd>J</kbd> to open or close this prompt
      </span>
    </CommandDialog>
  );
}
