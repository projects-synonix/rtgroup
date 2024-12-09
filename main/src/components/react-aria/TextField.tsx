"use client"
import React from 'react';
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  TextArea,
  ValidationResult
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Description, FieldError, Input, Label, fieldBorderStyles } from './Field';
import { composeTailwindRenderProps, focusRing } from './utils';


export const inputStyles = tv({
  extend: focusRing,
  base: 'border-2 rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  }
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function TextField(
  { label, description, errorMessage, placeholder, ...props }: TextFieldProps
) {
  return (
    <AriaTextField {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1')}>
      {label && <Label>{label}</Label>}
      <Input className={inputStyles} placeholder={placeholder}/>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}

export interface TextFieldAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  rows?: number;
  cols?: number;
}
export const areaStyles = tv({
  extend: focusRing,
  base: 'border-2 rounded-md bg-white dark:bg-zinc-900 text-sm text-gray-800 dark:text-zinc-200 disabled:text-gray-200 dark:disabled:text-zinc-600',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  }
});
export function TextFieldArea(
  { label, description, errorMessage, placeholder, ...props }: TextFieldAreaProps
) {
  const classname = 'bg-white dark:bg-zinc-900 text-sm text-gray-800 dark:text-zinc-200 disabled:text-gray-200 dark:disabled:text-zinc-600';

  return (
    <AriaTextField {...props} className={composeTailwindRenderProps(props.className, 'flex flex-col gap-1')}>
      {label && <Label>{label}</Label>}
      <TextArea className={areaStyles} placeholder={placeholder} rows={props.rows} cols={props.rows}/>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
