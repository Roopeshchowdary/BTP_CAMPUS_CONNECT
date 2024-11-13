//@ts-nocheck
import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(function Slider(
  {
    className,
    min,
    max,
    step,
    formatLabel,
    value,
    onValueChange,
    minStepsBetweenThumbs,
    ...props
  },
  ref
) {
  const initialValue = Array.isArray(value) ? value : [min, max];
  const [localValues, setLocalValues] = useState(initialValue);

  const handleValueChange = (newValues) => {
    setLocalValues(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={localValues}
      onValueChange={handleValueChange}
      className={cn(
        "relative flex w-[90%] touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <SliderPrimitive.Range className="absolute h-full bg-slate-900 dark:bg-slate-50" />
      </SliderPrimitive.Track>
      {localValues.map((value, index) => (
        <React.Fragment key={index}>
          <div
            className="absolute text-center"
            style={{
              left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`,
              top: `10px`,
            }}
          >
            <span className="text-xs">
              {formatLabel ? formatLabel(value) : value}
            </span>
          </div>
          <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border-2 border-slate-900 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300" />
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
