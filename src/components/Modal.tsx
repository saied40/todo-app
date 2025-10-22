"use client";
import { cn } from "@/lib/utils";
import { MouseEventHandler, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  show: boolean;
  onClose: MouseEventHandler<Element>; // (e: MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
  closeButton?: boolean;
  disableClickOutside?: boolean;
}

export default function Modal({ show, onClose, children, className, closeButton=false, disableClickOutside=false }: ModalProps) {
  const eleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = ""; // Restore scroll
    }
    return () => { document.body.style.overflow = "" };
  }, [show]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (eleRef.current && !eleRef.current.contains(event.target as Node)) {
  //       onClose(event as any);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [onClose]);

  useEffect(() => {
    if (disableClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside modal content
      if (eleRef.current && !eleRef.current.contains(target)) {
        // Check if click is not on a MUI portal element (Menu, Select dropdown, etc.)
        const isPortalClick = (target as Element).closest?.('[role="presentation"]') || 
                              (target as Element).closest?.('.MuiPopover-root') ||
                              (target as Element).closest?.('.MuiModal-root');
        
        if (!isPortalClick) {
          onClose(event as any);
        }
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, show, disableClickOutside]);

  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 flex-center z-[100] bg-black/70" onClick={onClose}>
      <div className={cn("bg-white p-4 rounded-lg max-h-[80vh] max-w-[80vw] overflow-auto", className)} ref={eleRef} onClick={(e) => {e.stopPropagation();}}>
        {closeButton && (
          <button type="button" className="absolute top-4 right-4" onClick={onClose} aria-label="Close"><FaXmark size={24} className="text-primary" /></button>
        )}
        {children}
      </div>
    </div>,
    document.documentElement
  );
};
