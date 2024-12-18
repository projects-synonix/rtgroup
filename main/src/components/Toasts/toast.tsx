"use client"
import { ToastQueue, useToastQueue, useToastState } from "@react-stately/toast";
import { createPortal } from "react-dom";
import type { AriaToastProps, AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";
import { useToast, useToastRegion } from "@react-aria/toast";
import React, { ReactNode } from "react";
import { Button } from "react-aria-components";
import './toaststyle.css'

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

function ToastRegion<T extends React.ReactNode>({
  state,
  ...props
}: ToastRegionProps<T>) {
  let ref = React.useRef(null);
  let { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className="toast-region">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}
interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

function Toast<T extends React.ReactNode>({ state, ...props }: ToastProps<T>) {
  let ref = React.useRef(null);
  let { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref,
  );

  return (
    <div {...toastProps} ref={ref} className="toast">
      <div {...contentProps}>
        <div {...titleProps}>{props.toast.content}</div>
      </div>
      <Button {...closeButtonProps}>x</Button>
    </div>
  );
}

// Create a global toast queue.
export const toastQueue = new ToastQueue({
  maxVisibleToasts: 5,
}) as ToastQueue<ReactNode>;

export function GlobalToastRegion<T>(props: ToastRegionProps<T>) {
  // Subscribe to it.
  let state = useToastQueue(toastQueue);
  // Render toast region.
  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion {...props} state={state} />, document.body)
    : null;
}


export function sendNotification({message,timeout}:{message: string,timeout?:number}){
  toastQueue.add(message,{'timeout':timeout})
}
