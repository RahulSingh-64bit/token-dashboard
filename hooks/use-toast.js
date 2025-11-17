// lib/toast.js   (or hooks/use-toast.js, or wherever you keep it)
"use client"
import { useEffect, useState } from "react";
import { toast as sonnerToast } from "sonner";

// Sonner already handles all the logic: limit, auto-dismiss, stacking, etc.
// We just create a tiny wrapper so you can keep using `useToast()` exactly like before!

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function toast(props) {
  const id = genId();

  const toastFn = props.variant === "destructive"
    ? sonnerToast.error
    : props.variant === "success"
    ? sonnerToast.success
    : props.title
    ? sonnerToast.custom
    : sonnerToast.message;

  const options = {
    id,
    description: props.description,
    action: props.action,
    duration: props.duration || 4000,
    // You can customize more Sonner options here
  };

  if (props.title) {
    toastFn(props.title, options);
  } else {
    toastFn(props.description || "", options);
  }

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    update: (updatedProps) => {
      sonnerToast.dismiss(id);
      toast({ ...updatedProps });
    },
  };
}

function useToast() {
  const [_, setTick] = useState(0);

  // Force re-render when needed (Sonner handles state internally)
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    toast,
    dismiss: sonnerToast.dismiss,
    // Optional helpers
    success: (message, options) => sonnerToast.success(message, options),
    error: (message, options) => sonnerToast.error(message, options),
    info: (message, options) => sonnerToast.info(message, options),
    warning: (message, options) => sonnerToast.warning(message, options),
    loading: (message, options) => sonnerToast.loading(message, options),
  };
}

export { useToast, toast };