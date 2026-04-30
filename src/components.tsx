"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
   useBoundProp,
   useStateBinding,
   useStateValue,
   useFieldValidation,
   type BaseComponentProps,
} from "@json-render/react";
import {
   ArrowDownUp,
   Ban,
   Bell,
   Building2,
   ChevronDown,
   ChevronLeft,
   ChevronRight,
   ChevronsUpDown,
   Chrome,
   Copy,
   Database,
   Download,
   Eye,
   FileArchive,
   FileSpreadsheet,
   FileText,
   Filter,
   Folder,
   FolderPlus,
   Github,
   Globe,
   HelpCircle,
   Home,
   Image as ImageIcon,
   Info,
   KeyRound,
   Lightbulb,
   Link as LinkIcon,
   Lock,
   Mail,
   MoreHorizontal,
   Navigation,
   Palette,
   PanelLeft,
   PanelLeftClose,
   PencilLine,
   Play,
   Plus,
   Radio,
   RotateCw,
   Search,
   Settings,
   Shield,
   Sparkles,
   Table2,
   Terminal,
   Trash2,
   Upload,
   User,
   UserPlus,
   Users,
   X,
   type LucideIcon,
} from "lucide-react";

import { Button } from "./ui/button";
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import {
   Dialog as DialogPrimitive,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "./ui/dialog";
import {
   Accordion as AccordionPrimitive,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "./ui/accordion";
import {
   Avatar as AvatarPrimitive,
   AvatarImage,
   AvatarFallback,
} from "./ui/avatar";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";
import {
   Carousel as CarouselPrimitive,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "./ui/carousel";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "./ui/collapsible";
import {
   Table as TablePrimitive,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "./ui/table";
import {
   Drawer as DrawerPrimitive,
   DrawerContent,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
} from "./ui/drawer";
import {
   DropdownMenu as DropdownMenuPrimitive,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
   Pagination as PaginationPrimitive,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "./ui/pagination";
import {
   Popover as PopoverPrimitive,
   PopoverContent,
   PopoverTrigger,
} from "./ui/popover";
import { Skeleton } from "./ui/skeleton";
import { Slider } from "./ui/slider";
import {
   Tabs as TabsPrimitive,
   TabsList,
   TabsTrigger,
   TabsContent,
} from "./ui/tabs";
import { Toggle } from "./ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
   Tooltip as TooltipPrimitive,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "./lib/utils";

import { type ShadcnProps } from "./catalog";

// =============================================================================
// Helpers
// =============================================================================

function getPaginationRange(
   current: number,
   total: number
): Array<number | "ellipsis"> {
   if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
   }
   const pages: Array<number | "ellipsis"> = [];
   pages.push(1);
   if (current > 3) {
      pages.push("ellipsis");
   }
   const start = Math.max(2, current - 1);
   const end = Math.min(total - 1, current + 1);
   for (let i = start; i <= end; i++) {
      pages.push(i);
   }
   if (current < total - 2) {
      pages.push("ellipsis");
   }
   pages.push(total);
   return pages;
}

// =============================================================================
// Standard Component Implementations
// =============================================================================

/**
 * Standard shadcn/ui component implementations.
 *
 * Pass to `defineRegistry()` from `@json-render/react` to create a
 * component registry for rendering JSON specs with shadcn/ui components.
 *
 * @example
 * ```ts
 * import { defineRegistry } from "@json-render/react";
 * import { shadcnComponents } from "@json-render/shadcn";
 *
 * const { registry } = defineRegistry(catalog, {
 *   components: {
 *     Card: shadcnComponents.Card,
 *     Button: shadcnComponents.Button,
 *   },
 * });
 * ```
 */
export const shadcnComponents = {
   // ── Layout ────────────────────────────────────────────────────────────

   Card: ({ props, children }: BaseComponentProps<ShadcnProps<"Card">>) => {
      const maxWidthClass =
         props.maxWidth === "sm"
            ? "max-w-xs sm:min-w-[280px]"
            : props.maxWidth === "md"
            ? "max-w-sm sm:min-w-[320px]"
            : props.maxWidth === "lg"
            ? "max-w-md sm:min-w-[360px]"
            : "w-full";
      const centeredClass = props.centered ? "mx-auto" : "";

      return (
         <Card className={cn(maxWidthClass, centeredClass, props.className)}>
            {(props.title || props.description) && (
               <CardHeader>
                  {props.title && <CardTitle>{props.title}</CardTitle>}
                  {props.description && (
                     <CardDescription>{props.description}</CardDescription>
                  )}
               </CardHeader>
            )}
            <CardContent className="flex flex-col gap-3">
               {children}
            </CardContent>
         </Card>
      );
   },

   Stack: ({ props, children }: BaseComponentProps<ShadcnProps<"Stack">>) => {
      const isHorizontal = props.direction === "horizontal";
      const gapMap: Record<string, string> = {
         none: "gap-0",
         sm: "gap-2",
         md: "gap-3",
         lg: "gap-4",
         xl: "gap-6",
      };
      const alignMap: Record<string, string> = {
         start: "items-start",
         center: "items-center",
         end: "items-end",
         stretch: "items-stretch",
      };
      const justifyMap: Record<string, string> = {
         start: "",
         center: "justify-center",
         end: "justify-end",
         between: "justify-between",
         around: "justify-around",
      };

      const gapClass = gapMap[props.gap ?? "md"] ?? "gap-3";
      const alignClass = alignMap[props.align ?? "start"] ?? "items-start";
      const justifyClass = justifyMap[props.justify ?? ""] ?? "";

      return (
         <div
            className={cn(
               "flex",
               isHorizontal ? "flex-row flex-wrap" : "flex-col",
               gapClass,
               alignClass,
               justifyClass,
               props.className
            )}
         >
            {children}
         </div>
      );
   },

   Grid: ({ props, children }: BaseComponentProps<ShadcnProps<"Grid">>) => {
      const colsMap: Record<number, string> = {
         1: "grid-cols-1",
         2: "grid-cols-2",
         3: "grid-cols-3",
         4: "grid-cols-4",
         5: "grid-cols-5",
         6: "grid-cols-6",
      };
      const gridGapMap: Record<string, string> = {
         sm: "gap-2",
         md: "gap-3",
         lg: "gap-4",
         xl: "gap-6",
      };

      const n = Math.max(1, Math.min(6, props.columns ?? 1));
      const cols = colsMap[n] ?? "grid-cols-1";
      const gridGap = gridGapMap[props.gap ?? "md"] ?? "gap-3";

      return (
         <div className={cn("grid", cols, gridGap, props.className)}>
            {children}
         </div>
      );
   },

   Separator: ({ props }: BaseComponentProps<ShadcnProps<"Separator">>) => {
      return (
         <Separator
            orientation={props.orientation ?? "horizontal"}
            className={
               props.orientation === "vertical" ? "h-full mx-2" : "my-3"
            }
         />
      );
   },

   Tabs: ({
      props,
      children,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Tabs">>) => {
      const tabs = props.tabs ?? [];
      const [boundValue, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState(
         props.defaultValue ?? tabs[0]?.value ?? ""
      );
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? tabs[0]?.value ?? "" : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;

      return (
         <TabsPrimitive
            value={value}
            onValueChange={(v) => {
               setValue(v);
               emit("change");
            }}
         >
            <TabsList>
               {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                     {tab.label}
                  </TabsTrigger>
               ))}
            </TabsList>
            {children}
         </TabsPrimitive>
      );
   },

   Accordion: ({ props }: BaseComponentProps<ShadcnProps<"Accordion">>) => {
      const items = props.items ?? [];
      const isMultiple = props.type === "multiple";

      const itemElements = items.map((item, i) => (
         <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
         </AccordionItem>
      ));

      if (isMultiple) {
         return (
            <AccordionPrimitive type="multiple" className="w-full">
               {itemElements}
            </AccordionPrimitive>
         );
      }
      return (
         <AccordionPrimitive type="single" collapsible className="w-full">
            {itemElements}
         </AccordionPrimitive>
      );
   },

   Collapsible: ({
      props,
      children,
   }: BaseComponentProps<ShadcnProps<"Collapsible">>) => {
      const [open, setOpen] = useState(props.defaultOpen ?? false);
      return (
         <Collapsible open={open} onOpenChange={setOpen} className="w-full">
            <CollapsibleTrigger asChild>
               <button className="flex w-full items-center justify-between rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                  {props.title}
                  <svg
                     className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                     }`}
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                     />
                  </svg>
               </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">{children}</CollapsibleContent>
         </Collapsible>
      );
   },

   Dialog: ({ props, children }: BaseComponentProps<ShadcnProps<"Dialog">>) => {
      const [open, setOpen] = useStateBinding<boolean>(props.openPath ?? "");
      return (
         <DialogPrimitive open={open ?? false} onOpenChange={(v) => setOpen(v)}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>{props.title}</DialogTitle>
                  {props.description && (
                     <DialogDescription>{props.description}</DialogDescription>
                  )}
               </DialogHeader>
               {children}
            </DialogContent>
         </DialogPrimitive>
      );
   },

   Drawer: ({ props, children }: BaseComponentProps<ShadcnProps<"Drawer">>) => {
      const [open, setOpen] = useStateBinding<boolean>(props.openPath ?? "");
      return (
         <DrawerPrimitive open={open ?? false} onOpenChange={(v) => setOpen(v)}>
            <DrawerContent>
               <DrawerHeader>
                  <DrawerTitle>{props.title}</DrawerTitle>
                  {props.description && (
                     <DrawerDescription>{props.description}</DrawerDescription>
                  )}
               </DrawerHeader>
               <div className="p-4">{children}</div>
            </DrawerContent>
         </DrawerPrimitive>
      );
   },

   Carousel: ({ props }: BaseComponentProps<ShadcnProps<"Carousel">>) => {
      const items = props.items ?? [];
      return (
         <CarouselPrimitive className="w-full">
            <CarouselContent>
               {items.map((item, i) => (
                  <CarouselItem
                     key={i}
                     className="basis-3/4 md:basis-1/2 lg:basis-1/3"
                  >
                     <div className="border border-border rounded-lg p-4 bg-card h-full">
                        {item.title && (
                           <h4 className="font-semibold text-sm mb-1">
                              {item.title}
                           </h4>
                        )}
                        {item.description && (
                           <p className="text-sm text-muted-foreground">
                              {item.description}
                           </p>
                        )}
                     </div>
                  </CarouselItem>
               ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
         </CarouselPrimitive>
      );
   },

   // ── Data Display ──────────────────────────────────────────────────────

   Table: ({ props }: BaseComponentProps<ShadcnProps<"Table">>) => {
      const columns = props.columns ?? [];
      const rows = (props.rows ?? []).map((row) => row.map(String));

      return (
         <div className="rounded-md border border-border overflow-hidden">
            <TablePrimitive>
               {props.caption && <TableCaption>{props.caption}</TableCaption>}
               <TableHeader>
                  <TableRow>
                     {columns.map((col) => (
                        <TableHead key={col}>{col}</TableHead>
                     ))}
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {rows.map((row, i) => (
                     <TableRow key={i}>
                        {row.map((cell, j) => (
                           <TableCell key={j}>{cell}</TableCell>
                        ))}
                     </TableRow>
                  ))}
               </TableBody>
            </TablePrimitive>
         </div>
      );
   },

   Heading: ({ props }: BaseComponentProps<ShadcnProps<"Heading">>) => {
      const level = props.level ?? "h2";
      const headingClass =
         level === "h1"
            ? "text-2xl font-bold"
            : level === "h3"
            ? "text-base font-semibold"
            : level === "h4"
            ? "text-sm font-semibold"
            : "text-lg font-semibold";

      if (level === "h1")
         return <h1 className={`${headingClass} text-left`}>{props.text}</h1>;
      if (level === "h3")
         return <h3 className={`${headingClass} text-left`}>{props.text}</h3>;
      if (level === "h4")
         return <h4 className={`${headingClass} text-left`}>{props.text}</h4>;
      return <h2 className={`${headingClass} text-left`}>{props.text}</h2>;
   },

   Text: ({ props }: BaseComponentProps<ShadcnProps<"Text">>) => {
      const textClass =
         props.variant === "caption"
            ? "text-xs"
            : props.variant === "muted"
            ? "text-sm text-muted-foreground"
            : props.variant === "lead"
            ? "text-xl text-muted-foreground"
            : props.variant === "code"
            ? "font-mono text-sm bg-muted px-1.5 py-0.5 rounded"
            : "text-sm";

      if (props.variant === "code") {
         return <code className={`${textClass} text-left`}>{props.text}</code>;
      }
      return <p className={`${textClass} text-left`}>{props.text}</p>;
   },

   Image: ({ props }: BaseComponentProps<ShadcnProps<"Image">>) => {
      if (props.src) {
         return (
            <img
               src={props.src}
               alt={props.alt ?? ""}
               width={props.width ?? undefined}
               height={props.height ?? undefined}
               className="rounded max-w-full"
            />
         );
      }
      return (
         <div
            className="bg-muted border border-border rounded flex items-center justify-center text-xs text-muted-foreground"
            style={{ width: props.width ?? 80, height: props.height ?? 60 }}
         >
            {props.alt || "img"}
         </div>
      );
   },

   Avatar: ({ props }: BaseComponentProps<ShadcnProps<"Avatar">>) => {
      const name = props.name || "?";
      const initials = name
         .split(" ")
         .map((n) => n[0])
         .join("")
         .slice(0, 2)
         .toUpperCase();
      const sizeClass =
         props.size === "lg"
            ? "h-12 w-12"
            : props.size === "sm"
            ? "h-8 w-8"
            : "h-10 w-10";

      return (
         <AvatarPrimitive className={sizeClass}>
            {props.src && <AvatarImage src={props.src} alt={name} />}
            <AvatarFallback>{initials}</AvatarFallback>
         </AvatarPrimitive>
      );
   },

   Badge: ({ props }: BaseComponentProps<ShadcnProps<"Badge">>) => {
      return <Badge variant={props.variant ?? "default"}>{props.text}</Badge>;
   },

   Alert: ({ props }: BaseComponentProps<ShadcnProps<"Alert">>) => {
      const variant = props.type === "error" ? "destructive" : "default";
      const customClass =
         props.type === "success"
            ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
            : props.type === "warning"
            ? "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100"
            : props.type === "info"
            ? "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100"
            : "";

      return (
         <Alert variant={variant} className={customClass}>
            <AlertTitle>{props.title}</AlertTitle>
            {props.message && (
               <AlertDescription>{props.message}</AlertDescription>
            )}
         </Alert>
      );
   },

   Progress: ({ props }: BaseComponentProps<ShadcnProps<"Progress">>) => {
      const value = Math.min(100, Math.max(0, props.value || 0));
      return (
         <div className="space-y-2">
            {props.label && (
               <Label className="text-sm text-muted-foreground">
                  {props.label}
               </Label>
            )}
            <Progress value={value} />
         </div>
      );
   },

   Skeleton: ({ props }: BaseComponentProps<ShadcnProps<"Skeleton">>) => {
      return (
         <Skeleton
            className={props.rounded ? "rounded-full" : "rounded-md"}
            style={{
               width: props.width ?? "100%",
               height: props.height ?? "1.25rem",
            }}
         />
      );
   },

   Spinner: ({ props }: BaseComponentProps<ShadcnProps<"Spinner">>) => {
      const sizeClass =
         props.size === "lg"
            ? "h-8 w-8"
            : props.size === "sm"
            ? "h-4 w-4"
            : "h-6 w-6";
      return (
         <div className="flex items-center gap-2">
            <svg
               className={`${sizeClass} animate-spin text-muted-foreground`}
               viewBox="0 0 24 24"
               fill="none"
            >
               <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
               />
               <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
               />
            </svg>
            {props.label && (
               <span className="text-sm text-muted-foreground">
                  {props.label}
               </span>
            )}
         </div>
      );
   },

   Tooltip: ({ props }: BaseComponentProps<ShadcnProps<"Tooltip">>) => {
      return (
         <TooltipProvider>
            <TooltipPrimitive>
               <TooltipTrigger asChild>
                  <span className="text-sm underline decoration-dotted cursor-help">
                     {props.text}
                  </span>
               </TooltipTrigger>
               <TooltipContent>
                  <p>{props.content}</p>
               </TooltipContent>
            </TooltipPrimitive>
         </TooltipProvider>
      );
   },

   Popover: ({ props }: BaseComponentProps<ShadcnProps<"Popover">>) => {
      return (
         <PopoverPrimitive>
            <PopoverTrigger asChild>
               <Button variant="outline" className="text-sm">
                  {props.trigger}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
               <p className="text-sm">{props.content}</p>
            </PopoverContent>
         </PopoverPrimitive>
      );
   },

   // ── Form Inputs ───────────────────────────────────────────────────────

   Input: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Input">>) => {
      const [boundValue, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState("");
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? "" : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;
      const validateOn = props.validateOn ?? "blur";

      const hasValidation = !!(bindings?.value && props.checks?.length);
      const { errors, validate } = useFieldValidation(
         bindings?.value ?? "",
         hasValidation ? { checks: props.checks ?? [], validateOn } : undefined
      );

      return (
         <div className="space-y-2">
            {props.label && (
               <Label htmlFor={props.name ?? undefined}>{props.label}</Label>
            )}
            <Input
               id={props.name ?? undefined}
               name={props.name ?? undefined}
               type={props.type ?? "text"}
               placeholder={props.placeholder ?? ""}
               value={value}
               onChange={(e) => {
                  setValue(e.target.value);
                  if (hasValidation && validateOn === "change") validate();
               }}
               onKeyDown={(e) => {
                  if (e.key === "Enter") emit("submit");
               }}
               onFocus={() => emit("focus")}
               onBlur={() => {
                  if (hasValidation && validateOn === "blur") validate();
                  emit("blur");
               }}
            />
            {errors.length > 0 && (
               <p className="text-sm text-destructive">{errors[0]}</p>
            )}
         </div>
      );
   },

   Textarea: ({
      props,
      bindings,
   }: BaseComponentProps<ShadcnProps<"Textarea">>) => {
      const [boundValue, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState("");
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? "" : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;
      const validateOn = props.validateOn ?? "blur";

      const hasValidation = !!(bindings?.value && props.checks?.length);
      const { errors, validate } = useFieldValidation(
         bindings?.value ?? "",
         hasValidation ? { checks: props.checks ?? [], validateOn } : undefined
      );

      return (
         <div className="space-y-2">
            {props.label && (
               <Label htmlFor={props.name ?? undefined}>{props.label}</Label>
            )}
            <Textarea
               id={props.name ?? undefined}
               name={props.name ?? undefined}
               placeholder={props.placeholder ?? ""}
               rows={props.rows ?? 3}
               value={value}
               onChange={(e) => {
                  setValue(e.target.value);
                  if (hasValidation && validateOn === "change") validate();
               }}
               onBlur={() => {
                  if (hasValidation && validateOn === "blur") validate();
               }}
            />
            {errors.length > 0 && (
               <p className="text-sm text-destructive">{errors[0]}</p>
            )}
         </div>
      );
   },

   Select: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Select">>) => {
      const [boundValue, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState<string>("");
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? "" : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;
      const rawOptions = props.options ?? [];
      const options = rawOptions.map((opt) =>
         typeof opt === "string" ? opt : String(opt ?? "")
      );
      const validateOn = props.validateOn ?? "change";

      const hasValidation = !!(bindings?.value && props.checks?.length);
      const { errors, validate } = useFieldValidation(
         bindings?.value ?? "",
         hasValidation ? { checks: props.checks ?? [], validateOn } : undefined
      );

      return (
         <div className="space-y-2">
            <Label>{props.label}</Label>
            <Select
               value={value}
               onValueChange={(v) => {
                  setValue(v);
                  // Select has no native blur event, so only validate on "change"
                  if (hasValidation && validateOn === "change") validate();
                  emit("change");
               }}
            >
               <SelectTrigger className="w-full">
                  <SelectValue placeholder={props.placeholder ?? "Select..."} />
               </SelectTrigger>
               <SelectContent>
                  {options.map((opt, idx) => (
                     <SelectItem
                        key={`${idx}-${opt}`}
                        value={opt || `option-${idx}`}
                     >
                        {opt}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
            {errors.length > 0 && (
               <p className="text-sm text-destructive">{errors[0]}</p>
            )}
         </div>
      );
   },

   Checkbox: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Checkbox">>) => {
      const [boundChecked, setBoundChecked] = useBoundProp<boolean>(
         props.checked as boolean | undefined,
         bindings?.checked
      );
      const [localChecked, setLocalChecked] = useState(!!props.checked);
      const isBound = !!bindings?.checked;
      const checked = isBound ? boundChecked ?? false : localChecked;
      const setChecked = isBound ? setBoundChecked : setLocalChecked;

      const validateOn = props.validateOn ?? "change";
      const hasValidation = !!(bindings?.checked && props.checks?.length);
      const { errors, validate } = useFieldValidation(
         bindings?.checked ?? "",
         hasValidation ? { checks: props.checks ?? [], validateOn } : undefined
      );

      return (
         <div className="space-y-1">
            <div className="flex items-center space-x-2">
               <Checkbox
                  id={props.name ?? undefined}
                  checked={checked}
                  onCheckedChange={(c) => {
                     setChecked(c === true);
                     if (hasValidation && validateOn === "change") validate();
                     emit("change");
                  }}
               />
               <Label
                  htmlFor={props.name ?? undefined}
                  className="cursor-pointer"
               >
                  {props.label}
               </Label>
            </div>
            {errors.length > 0 && (
               <p className="text-sm text-destructive">{errors[0]}</p>
            )}
         </div>
      );
   },

   Radio: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Radio">>) => {
      const rawOptions = props.options ?? [];
      const options = rawOptions.map((opt) =>
         typeof opt === "string" ? opt : String(opt ?? "")
      );
      const [boundValue, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState(options[0] ?? "");
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? "" : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;

      const validateOn = props.validateOn ?? "change";
      const hasValidation = !!(bindings?.value && props.checks?.length);
      const { errors, validate } = useFieldValidation(
         bindings?.value ?? "",
         hasValidation ? { checks: props.checks ?? [], validateOn } : undefined
      );

      return (
         <div className="space-y-2">
            {props.label && <Label>{props.label}</Label>}
            <RadioGroup
               value={value}
               onValueChange={(v) => {
                  setValue(v);
                  if (hasValidation && validateOn === "change") validate();
                  emit("change");
               }}
            >
               {options.map((opt, idx) => (
                  <div
                     key={`${idx}-${opt}`}
                     className="flex items-center space-x-2"
                  >
                     <RadioGroupItem
                        value={opt || `option-${idx}`}
                        id={`${props.name}-${idx}-${opt}`}
                     />
                     <Label
                        htmlFor={`${props.name}-${idx}-${opt}`}
                        className="cursor-pointer"
                     >
                        {opt}
                     </Label>
                  </div>
               ))}
            </RadioGroup>
            {errors.length > 0 && (
               <p className="text-sm text-destructive">{errors[0]}</p>
            )}
         </div>
      );
   },

   Switch: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Switch">>) => {
      const [boundChecked, setBoundChecked] = useBoundProp<boolean>(
         props.checked as boolean | undefined,
         bindings?.checked
      );
      const [localChecked, setLocalChecked] = useState(!!props.checked);
      const isBound = !!bindings?.checked;
      const checked = isBound ? boundChecked ?? false : localChecked;
      const setChecked = isBound ? setBoundChecked : setLocalChecked;

      const validateOn = props.validateOn ?? "change";
      const hasValidation = !!(bindings?.checked && props.checks?.length);
      const { errors, validate } = useFieldValidation(
         bindings?.checked ?? "",
         hasValidation ? { checks: props.checks ?? [], validateOn } : undefined
      );

      return (
         <div className="space-y-1">
            <div className="flex items-center justify-between space-x-2">
               <Label
                  htmlFor={props.name ?? undefined}
                  className="cursor-pointer"
               >
                  {props.label}
               </Label>
               <Switch
                  id={props.name ?? undefined}
                  checked={checked}
                  onCheckedChange={(c) => {
                     setChecked(c);
                     if (hasValidation && validateOn === "change") validate();
                     emit("change");
                  }}
               />
            </div>
            {errors.length > 0 && (
               <p className="text-sm text-destructive">{errors[0]}</p>
            )}
         </div>
      );
   },

   Slider: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Slider">>) => {
      const [boundValue, setBoundValue] = useBoundProp<number>(
         props.value as number | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState(props.min ?? 0);
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? props.min ?? 0 : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;

      return (
         <div className="space-y-2">
            {props.label && (
               <div className="flex justify-between">
                  <Label className="text-sm">{props.label}</Label>
                  <span className="text-sm text-muted-foreground">{value}</span>
               </div>
            )}
            <Slider
               value={[value]}
               min={props.min ?? 0}
               max={props.max ?? 100}
               step={props.step ?? 1}
               onValueChange={(v) => {
                  setValue(v[0] ?? 0);
                  emit("change");
               }}
            />
         </div>
      );
   },

   // ── Actions ───────────────────────────────────────────────────────────

   Button: ({ props, emit }: BaseComponentProps<ShadcnProps<"Button">>) => {
      const rewrite = {
         danger: "destructive",
      };
      // default, destructive, outline, secondary, ghost, link
      const variants = [
         "default",
         "secondary",
         "destructive",
         "outline",
         "ghost",
         "link",
      ];
      const variant = variants.includes(props.variant ?? "")
         ? props.variant
         : rewrite[props.variant as keyof typeof rewrite] ?? "default";

      return (
         <Button
            variant={variant as any}
            disabled={props.disabled ?? false}
            onClick={() => emit("press")}
         >
            {props.label}
         </Button>
      );
   },

   Link: ({ props, on }: BaseComponentProps<ShadcnProps<"Link">>) => {
      return (
         <a
            href={props.href ?? "#"}
            className="text-primary underline-offset-4 hover:underline text-sm font-medium"
            onClick={(e) => {
               const press = on("press");
               if (press.shouldPreventDefault) e.preventDefault();
               press.emit();
            }}
         >
            {props.label}
         </a>
      );
   },

   DropdownMenu: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"DropdownMenu">>) => {
      const items = props.items ?? [];
      const [, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      return (
         <DropdownMenuPrimitive>
            <DropdownMenuTrigger asChild>
               <Button variant="outline">{props.label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {items.map((item) => (
                  <DropdownMenuItem
                     key={item.value}
                     onClick={() => {
                        setBoundValue(item.value);
                        emit("select");
                     }}
                  >
                     {item.label}
                  </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenuPrimitive>
      );
   },

   Toggle: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Toggle">>) => {
      const [boundPressed, setBoundPressed] = useBoundProp<boolean>(
         props.pressed as boolean | undefined,
         bindings?.pressed
      );
      const [localPressed, setLocalPressed] = useState(props.pressed ?? false);
      const isBound = !!bindings?.pressed;
      const pressed = isBound ? boundPressed ?? false : localPressed;
      const setPressed = isBound ? setBoundPressed : setLocalPressed;

      return (
         <Toggle
            variant={props.variant ?? "default"}
            pressed={pressed}
            onPressedChange={(v) => {
               setPressed(v);
               emit("change");
            }}
         >
            {props.label}
         </Toggle>
      );
   },

   ToggleGroup: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"ToggleGroup">>) => {
      const type = props.type ?? "single";
      const items = props.items ?? [];
      const [boundValue, setBoundValue] = useBoundProp<string>(
         props.value as string | undefined,
         bindings?.value
      );
      const [localValue, setLocalValue] = useState(items[0]?.value ?? "");
      const isBound = !!bindings?.value;
      const value = isBound ? boundValue ?? "" : localValue;
      const setValue = isBound ? setBoundValue : setLocalValue;

      if (type === "multiple") {
         const selected = value ? value.split(",").filter(Boolean) : [];
         return (
            <ToggleGroup
               type="multiple"
               value={selected}
               onValueChange={(v) => {
                  setValue(v.join(","));
                  emit("change");
               }}
            >
               {items.map((item) => (
                  <ToggleGroupItem key={item.value} value={item.value}>
                     {item.label}
                  </ToggleGroupItem>
               ))}
            </ToggleGroup>
         );
      }

      return (
         <ToggleGroup
            type="single"
            value={value}
            onValueChange={(v) => {
               if (v) {
                  setValue(v);
                  emit("change");
               }
            }}
         >
            {items.map((item) => (
               <ToggleGroupItem key={item.value} value={item.value}>
                  {item.label}
               </ToggleGroupItem>
            ))}
         </ToggleGroup>
      );
   },

   ButtonGroup: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"ButtonGroup">>) => {
      const buttons = props.buttons ?? [];
      const [boundSelected, setBoundSelected] = useBoundProp<string>(
         props.selected as string | undefined,
         bindings?.selected
      );
      const [localValue, setLocalValue] = useState(buttons[0]?.value ?? "");
      const isBound = !!bindings?.selected;
      const value = isBound ? boundSelected ?? "" : localValue;
      const setValue = isBound ? setBoundSelected : setLocalValue;

      return (
         <div className="inline-flex rounded-md border border-border">
            {buttons.map((btn, i) => (
               <button
                  key={btn.value}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                     value === btn.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                  } ${i > 0 ? "border-l border-border" : ""} ${
                     i === 0 ? "rounded-l-md" : ""
                  } ${i === buttons.length - 1 ? "rounded-r-md" : ""}`}
                  onClick={() => {
                     setValue(btn.value);
                     emit("change");
                  }}
               >
                  {btn.label}
               </button>
            ))}
         </div>
      );
   },

   Pagination: ({
      props,
      bindings,
      emit,
   }: BaseComponentProps<ShadcnProps<"Pagination">>) => {
      const [boundPage, setBoundPage] = useBoundProp<number>(
         props.page as number | undefined,
         bindings?.page
      );
      const currentPage = boundPage ?? 1;
      const totalPages = props.totalPages ?? 1;
      const pages = getPaginationRange(currentPage, totalPages);

      return (
         <PaginationPrimitive>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                           setBoundPage(currentPage - 1);
                           emit("change");
                        }
                     }}
                  />
               </PaginationItem>
               {pages.map((page, idx) =>
                  page === "ellipsis" ? (
                     <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                     </PaginationItem>
                  ) : (
                     <PaginationItem key={page}>
                        <PaginationLink
                           href="#"
                           isActive={page === currentPage}
                           onClick={(e) => {
                              e.preventDefault();
                              setBoundPage(page);
                              emit("change");
                           }}
                        >
                           {page}
                        </PaginationLink>
                     </PaginationItem>
                  )
               )}
               <PaginationItem>
                  <PaginationNext
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                           setBoundPage(currentPage + 1);
                           emit("change");
                        }
                     }}
                  />
               </PaginationItem>
            </PaginationContent>
         </PaginationPrimitive>
      );
   },

   // ── Studio Dashboard ─────────────────────────────────────────────────

   StudioShell: ({
      props,
      bindings,
      children,
   }: BaseComponentProps<ShadcnProps<"StudioShell">>) => {
      const stateActiveSection = useStateValue("/activeSection") as
         | string
         | undefined;
      const [boundActiveSection, setActiveSection] = useBoundProp<string>(
         props.activeSection ?? stateActiveSection ?? undefined,
         bindings?.activeSection
      );
      const activeSection =
         boundActiveSection ??
         props.activeSection ??
         stateActiveSection ??
         "table";
      const navItems = props.navItems ?? [];

      return (
         <div className="dark h-screen overflow-hidden bg-background font-sans text-foreground">
            <header className="flex h-10 shrink-0 items-center gap-1.5 border-b border-border bg-sidebar px-2 text-xs">
               <SupabaseIcon className="mx-1" />
               <StudioPill>
                  <Building2 className="size-3 opacity-70" />
                  <span>{props.projectName}</span>
                  {props.environment && (
                     <StudioMiniBadge>{props.environment}</StudioMiniBadge>
                  )}
                  <ChevronsUpDown className="size-3 opacity-50" />
               </StudioPill>
               <span className="px-1 text-muted-foreground/60">/</span>
               <StudioPill>
                  <Database className="size-3 opacity-70" />
                  <span>{props.databaseName}</span>
                  <ChevronsUpDown className="size-3 opacity-50" />
               </StudioPill>
               <span className="px-1 text-muted-foreground/60">/</span>
               <StudioPill>
                  <span className="size-2 rounded-full bg-[hsl(var(--sb-color-brand-default))] shadow-[0_0_10px_hsl(var(--sb-color-brand-default)/0.5)]" />
                  <span>{props.branchName}</span>
                  {props.statusLabel && (
                     <StudioMiniBadge className="border-[hsl(var(--sb-color-brand-default)/0.35)] bg-[hsl(var(--sb-color-brand-default)/0.12)] text-[hsl(var(--sb-color-brand-default))]">
                        {props.statusLabel}
                     </StudioMiniBadge>
                  )}
               </StudioPill>
               <div className="flex-1" />
               <Button
                  variant="ghost"
                  size="xs"
                  className="text-muted-foreground"
               >
                  Feedback
               </Button>
               <div className="hidden min-w-44 items-center gap-2 rounded-md border border-border bg-muted/40 px-2 py-1 text-muted-foreground md:flex">
                  <Search className="size-3" />
                  <span className="flex-1">Search...</span>
                  <kbd className="rounded border border-border px-1.5 font-mono text-[10px]">
                     Ctrl K
                  </kbd>
               </div>
               <StudioIconButton label="Help" icon={HelpCircle} />
               <StudioIconButton label="Notifications" icon={Bell} badge="3" />
               <StudioIconButton label="Theme" icon={Palette} />
               <div className="ml-1 size-6 rounded-full bg-[linear-gradient(135deg,hsl(var(--sb-color-secondary-default)),hsl(var(--sb-color-brand-default)))]" />
            </header>
            <div className="flex h-[calc(100vh-40px)] overflow-hidden">
               <nav className="flex w-[52px] shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar px-2 py-2">
                  {navItems.map((item) => {
                     const Icon = getStudioIcon(item.icon ?? item.id);
                     const isActive = activeSection === item.id;
                     return (
                        <Button
                           key={item.id}
                           variant="ghost"
                           size="icon-sm"
                           title={item.label}
                           aria-label={item.label}
                           onClick={() => setActiveSection(item.id)}
                           className={cn(
                              "size-9 text-muted-foreground",
                              isActive &&
                                 "bg-accent text-foreground hover:bg-accent hover:text-foreground"
                           )}
                        >
                           <Icon className="size-[18px]" />
                        </Button>
                     );
                  })}
                  <div className="flex-1" />
                  <StudioIconButton label="Collapse" icon={PanelLeft} />
               </nav>
               {children}
            </div>
         </div>
      );
   },

   StudioTableEditor: ({
      props,
      bindings,
   }: BaseComponentProps<ShadcnProps<"StudioTableEditor">>) => {
      const [schema, setSchema] = useBoundProp<string>(
         props.schema ?? props.schemas?.[0] ?? "public",
         bindings?.schema
      );
      const [activeTable, setActiveTable] = useBoundProp<string>(
         props.activeTable ?? "",
         bindings?.activeTable
      );
      const [openTabs, setOpenTabs] = useBoundProp<string[]>(
         props.openTabs ?? [],
         bindings?.openTabs
      );
      const [filter, setFilter] = useBoundProp<string>(
         props.filter ?? "",
         bindings?.filter
      );
      const [editingRow, setEditingRow] = useBoundProp<number | null>(
         props.editingRow ?? null,
         bindings?.editingRow
      );
      const tablesBySchema = props.tablesBySchema ?? {};
      const rowsByTable = props.rowsByTable ?? {};
      const currentSchema = schema ?? props.schemas?.[0] ?? "public";
      const tables = tablesBySchema[currentSchema] ?? [];
      const currentTableName = activeTable || tables[0]?.name || "";
      const currentTable =
         tables.find((table) => table.name === currentTableName) ?? tables[0];
      const currentKey = currentTable
         ? `${currentSchema}.${currentTable.name}`
         : "";
      const sourceRows = rowsByTable[currentKey] ?? [];
      const [localRowsByTable, setLocalRowsByTable] = useState(rowsByTable);
      const rows = (localRowsByTable[currentKey] ?? sourceRows) as Array<
         Record<string, unknown>
      >;
      const shownTabs =
         openTabs && openTabs.length > 0
            ? openTabs
            : currentTableName
            ? [currentTableName]
            : [];
      const filteredRows = rows
         .map((row, rowIndex) => ({ row, rowIndex }))
         .filter(({ row }) =>
            JSON.stringify(row)
               .toLowerCase()
               .includes((filter ?? "").toLowerCase())
         );

      function selectSchema(nextSchema: string) {
         const firstTable = tablesBySchema[nextSchema]?.[0]?.name ?? "";
         setSchema(nextSchema);
         setActiveTable(firstTable);
         setOpenTabs(firstTable ? [firstTable] : []);
         setEditingRow(null);
      }

      function selectTable(name: string) {
         setActiveTable(name);
         setOpenTabs(
            shownTabs.includes(name) ? shownTabs : [...shownTabs, name]
         );
         setEditingRow(null);
      }

      function saveRow(nextRow: Record<string, unknown>) {
         if (!currentKey) return;
         setLocalRowsByTable((current) => {
            const list = [
               ...((current[currentKey] ?? rows) as Array<
                  Record<string, unknown>
               >),
            ];
            if (
               editingRow === null ||
               editingRow === undefined ||
               editingRow < 0
            ) {
               list.push(nextRow);
            } else {
               list[editingRow] = nextRow;
            }
            return { ...current, [currentKey]: list };
         });
         setEditingRow(null);
      }

      function deleteRow() {
         if (!currentKey || editingRow === null || editingRow === undefined)
            return;
         setLocalRowsByTable((current) => ({
            ...current,
            [currentKey]: (current[currentKey] ?? rows).filter(
               (_row, index) => index !== editingRow
            ),
         }));
         setEditingRow(null);
      }

      return (
         <>
            <StudioSidebar title="Table Editor">
               <div className="space-y-2 px-3 pb-3">
                  <Select value={currentSchema} onValueChange={selectSchema}>
                     <SelectTrigger
                        size="sm"
                        className="h-8 w-full bg-muted/30"
                     >
                        <span className="text-muted-foreground">schema</span>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {(props.schemas ?? []).map((schemaName) => (
                           <SelectItem key={schemaName} value={schemaName}>
                              {schemaName}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
                  <div className="relative">
                     <Search className="pointer-events-none absolute left-2.5 top-2 size-3 text-muted-foreground" />
                     <Input
                        value={filter ?? ""}
                        onChange={(event) => setFilter(event.target.value)}
                        placeholder="Search rows..."
                        className="h-8 bg-background pl-8 text-xs"
                     />
                  </div>
               </div>
               <StudioSidebarGroup label={`${tables.length} tables`} />
               <div className="pb-3">
                  {tables.map((table) => (
                     <StudioSidebarItem
                        key={table.name}
                        icon={Table2}
                        label={table.name}
                        active={table.name === currentTableName}
                        badge={studioRlsLabel(table.rls)}
                        onClick={() => selectTable(table.name)}
                     />
                  ))}
               </div>
            </StudioSidebar>
            <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
               <div className="flex min-h-9 items-stretch border-b border-border bg-card">
                  <Button
                     variant="ghost"
                     size="icon-xs"
                     className="h-auto w-9 rounded-none border-r border-border text-muted-foreground"
                  >
                     <PanelLeftClose className="size-3.5" />
                  </Button>
                  {shownTabs.map((tab) => (
                     <button
                        key={tab}
                        onClick={() => selectTable(tab)}
                        className={cn(
                           "flex items-center gap-1.5 border-r border-border px-3 text-xs text-muted-foreground transition-colors",
                           tab === currentTableName &&
                              "bg-background text-foreground"
                        )}
                     >
                        <Table2 className="size-3.5" />
                        {tab}
                     </button>
                  ))}
                  <Button
                     variant="ghost"
                     size="icon-xs"
                     className="h-auto w-9 rounded-none border-r border-border text-muted-foreground"
                  >
                     <Plus className="size-3.5" />
                  </Button>
               </div>
               {currentTable ? (
                  <>
                     <div className="flex items-center gap-1 border-b border-border bg-card px-3 py-2">
                        <StudioToolbarButton icon={ArrowDownUp} label="Sort" />
                        <StudioToolbarButton icon={Filter} label="Filter" />
                        <StudioToolbarButton
                           icon={Lock}
                           label={
                              currentTable.rls === "unrestricted"
                                 ? "RLS disabled"
                                 : "RLS enabled"
                           }
                           tone={
                              currentTable.rls === "unrestricted"
                                 ? "danger"
                                 : "brand"
                           }
                        />
                        <StudioToolbarButton
                           icon={Lightbulb}
                           label="Index Advisor"
                        />
                        <StudioToolbarButton
                           icon={Radio}
                           label="Enable Realtime"
                        />
                        <div className="mx-1 h-5 w-px bg-border" />
                        <StudioToolbarButton
                           icon={User}
                           label="Role: postgres"
                           muted
                        />
                        <div className="flex-1" />
                        <StudioIconButton label="Reload" icon={RotateCw} />
                        <Button
                           size="xs"
                           onClick={() => setEditingRow(-1)}
                           className="border-[hsl(var(--sb-color-brand-default)/0.35)] bg-[hsl(var(--sb-color-brand-default)/0.12)] text-[hsl(var(--sb-color-brand-default))] hover:bg-[hsl(var(--sb-color-brand-default)/0.18)]"
                        >
                           <Plus className="size-3" />
                           Insert
                        </Button>
                     </div>
                     <div className="min-h-0 flex-1 overflow-auto">
                        <TablePrimitive className="table-fixed font-mono text-xs">
                           <TableHeader className="sticky top-0 z-10 bg-card">
                              <TableRow className="hover:bg-card">
                                 <TableHead className="w-9 border-r border-border/70 px-2">
                                    <input
                                       type="checkbox"
                                       className="accent-[hsl(var(--sb-color-brand-default))]"
                                    />
                                 </TableHead>
                                 {currentTable.columns.map((column, index) => (
                                    <TableHead
                                       key={column.name}
                                       className={cn(
                                          "border-r border-border/70 font-sans text-xs",
                                          index === 0 ? "w-28" : "w-56"
                                       )}
                                    >
                                       <div className="flex min-w-0 items-center gap-1.5">
                                          {column.pk && (
                                             <KeyRound className="size-3 text-[hsl(var(--sb-color-brand-default))]" />
                                          )}
                                          <span className="truncate text-foreground">
                                             {column.name}
                                          </span>
                                          <span className="text-muted-foreground">
                                             {column.type}
                                          </span>
                                          <ChevronDown className="ml-auto size-3 text-muted-foreground" />
                                       </div>
                                    </TableHead>
                                 ))}
                                 <TableHead />
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {filteredRows.map(({ row, rowIndex }) => (
                                 <TableRow
                                    key={rowIndex}
                                    className="h-[30px] cursor-pointer border-border/70"
                                    onClick={() => setEditingRow(rowIndex)}
                                 >
                                    <TableCell className="border-r border-border/70 px-2">
                                       <input
                                          type="checkbox"
                                          onClick={(event) =>
                                             event.stopPropagation()
                                          }
                                          className="accent-[hsl(var(--sb-color-brand-default))]"
                                       />
                                    </TableCell>
                                    {currentTable.columns.map((column) => (
                                       <TableCell
                                          key={column.name}
                                          className="overflow-hidden text-ellipsis border-r border-border/70 px-2 py-1"
                                       >
                                          <StudioRenderedValue
                                             type={column.type}
                                             value={row[column.name]}
                                          />
                                       </TableCell>
                                    ))}
                                    <TableCell />
                                 </TableRow>
                              ))}
                           </TableBody>
                        </TablePrimitive>
                     </div>
                     <div className="flex h-8 shrink-0 items-center gap-2 border-t border-border bg-card px-3 text-xs text-muted-foreground">
                        <Button variant="outline" size="icon-xs">
                           <ChevronLeft className="size-3" />
                        </Button>
                        <span>Page</span>
                        <span className="rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-foreground">
                           1
                        </span>
                        <span>of 1</span>
                        <Button variant="outline" size="icon-xs">
                           <ChevronRight className="size-3" />
                        </Button>
                        <span className="ml-2 rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-foreground">
                           100 rows
                        </span>
                        <span className="font-mono">{rows.length} records</span>
                        <div className="flex-1" />
                        <StudioSegmentedToggle
                           items={["Data", "Definition"]}
                           active="Data"
                        />
                     </div>
                  </>
               ) : (
                  <StudioEmptyState
                     icon={Table2}
                     title="Pick a table from the left"
                  />
               )}
            </main>
            <StudioRowDrawer
               table={currentTable}
               row={
                  editingRow !== null &&
                  editingRow !== undefined &&
                  editingRow >= 0
                     ? rows[editingRow] ?? null
                     : null
               }
               mode={editingRow === -1 ? "insert" : "edit"}
               open={editingRow !== null && editingRow !== undefined}
               onClose={() => setEditingRow(null)}
               onSave={saveRow}
               onDelete={deleteRow}
               schema={currentSchema}
            />
         </>
      );
   },

   StudioAuthPanel: ({
      props,
      bindings,
   }: BaseComponentProps<ShadcnProps<"StudioAuthPanel">>) => {
      const [section, setSection] = useBoundProp<
         "overview" | "users" | "providers"
      >(props.section ?? "users", bindings?.section);
      const [search, setSearch] = useBoundProp<string>(
         props.search ?? "",
         bindings?.search
      );
      const [selectedUserId, setSelectedUserId] = useBoundProp<string | null>(
         props.selectedUserId ?? null,
         bindings?.selectedUserId
      );
      const users = props.users ?? [];
      const activeSection = section ?? "users";
      const filteredUsers = users.filter(
         (user) =>
            user.email.toLowerCase().includes((search ?? "").toLowerCase()) ||
            user.id.includes(search ?? "")
      );
      const selectedUser =
         users.find((user) => user.id === selectedUserId) ?? null;

      return (
         <>
            <StudioSidebar title="Authentication">
               <StudioSidebarGroup label="Manage" />
               <StudioSidebarItem
                  icon={Database}
                  label="Overview"
                  active={activeSection === "overview"}
                  onClick={() => setSection("overview")}
               />
               <StudioSidebarItem
                  icon={Users}
                  label="Users"
                  active={activeSection === "users"}
                  onClick={() => setSection("users")}
               />
               <StudioSidebarItem
                  icon={KeyRound}
                  label="Providers"
                  active={activeSection === "providers"}
                  onClick={() => setSection("providers")}
               />
               <StudioSidebarGroup label="Configuration" />
               <StudioSidebarItem icon={Shield} label="Policies" />
               <StudioSidebarItem icon={LinkIcon} label="URL Configuration" />
               <StudioSidebarItem icon={Mail} label="Email Templates" />
            </StudioSidebar>
            <main className="min-w-0 flex-1 overflow-auto bg-background">
               {activeSection === "users" && (
                  <StudioContentPane>
                     <div className="mb-5 flex items-end gap-3">
                        <div className="flex-1">
                           <h2 className="text-[22px] font-normal tracking-normal">
                              Users
                           </h2>
                           <p className="mt-1 text-sm text-muted-foreground">
                              Manage sign-ups, OTPs and password resets.
                           </p>
                        </div>
                        <StudioMiniBadge>{users.length} TOTAL</StudioMiniBadge>
                        <Button
                           size="sm"
                           className="bg-[hsl(var(--sb-color-brand-default))] text-[hsl(var(--sb-color-foreground-contrast))]"
                        >
                           <UserPlus className="size-3.5" />
                           Add user
                        </Button>
                     </div>
                     <div className="relative mb-3">
                        <Search className="pointer-events-none absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
                        <Input
                           value={search ?? ""}
                           onChange={(event) => setSearch(event.target.value)}
                           placeholder="Search by email or user ID"
                           className="bg-card pl-9"
                        />
                        <span className="absolute right-3 top-2.5 font-mono text-xs text-muted-foreground">
                           {filteredUsers.length} matches
                        </span>
                     </div>
                     <div className="overflow-hidden rounded-lg border border-border bg-card">
                        <TablePrimitive>
                           <TableHeader>
                              <TableRow>
                                 <TableHead>Email</TableHead>
                                 <TableHead>Provider</TableHead>
                                 <TableHead>User ID</TableHead>
                                 <TableHead>Last sign in</TableHead>
                                 <TableHead>Created</TableHead>
                                 <TableHead className="w-8" />
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {filteredUsers.map((user) => (
                                 <TableRow
                                    key={user.id}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedUserId(user.id)}
                                 >
                                    <TableCell>
                                       <div className="flex items-center gap-2">
                                          <StudioAvatarDot
                                             seed={user.email}
                                             label={user.email[0] ?? "?"}
                                          />
                                          <span>{user.email}</span>
                                          {!user.confirmed && (
                                             <Badge className="rounded-sm border-warning/30 bg-[hsl(var(--sb-color-warning-default)/0.14)] font-mono text-[10px] text-[hsl(var(--sb-color-warning-default))]">
                                                UNCONFIRMED
                                             </Badge>
                                          )}
                                       </div>
                                    </TableCell>
                                    <TableCell>
                                       <StudioProviderPill
                                          provider={user.provider}
                                       />
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                       {user.id.slice(0, 8)}...
                                       {user.id.slice(-4)}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                       {user.last ?? "-"}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                       {user.created}
                                    </TableCell>
                                    <TableCell>
                                       <MoreHorizontal className="size-4 text-muted-foreground" />
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </TablePrimitive>
                     </div>
                  </StudioContentPane>
               )}
               {activeSection === "overview" && (
                  <StudioContentPane>
                     <h2 className="mb-5 text-[22px] font-normal">Overview</h2>
                     <div className="grid gap-3 md:grid-cols-2">
                        <StudioStatCard
                           label="AUTH ACTIVITY"
                           value="6"
                           delta="+12.0%"
                        />
                        <StudioStatCard
                           label="SIGN UPS"
                           value={users.length}
                           delta="+8.0%"
                        />
                        <StudioStatCard
                           label="API SUCCESS"
                           value="100.0%"
                           delta="0.0%"
                        />
                        <StudioStatCard
                           label="UNCONFIRMED"
                           value={
                              users.filter((user) => !user.confirmed).length
                           }
                           tone="warning"
                        />
                     </div>
                  </StudioContentPane>
               )}
               {activeSection === "providers" && (
                  <StudioContentPane className="max-w-3xl">
                     <h2 className="mb-5 text-[22px] font-normal">
                        Sign-in providers
                     </h2>
                     <div className="space-y-2">
                        <StudioProviderRow name="Email" icon={Mail} enabled />
                        <StudioProviderRow
                           name="GitHub"
                           icon={Github}
                           enabled
                        />
                        <StudioProviderRow
                           name="Google"
                           icon={Chrome}
                           enabled
                        />
                        <StudioProviderRow name="Magic links" icon={Sparkles} />
                     </div>
                  </StudioContentPane>
               )}
            </main>
            <StudioUserDrawer
               user={selectedUser}
               onClose={() => setSelectedUserId(null)}
            />
         </>
      );
   },

   StudioStorageExplorer: ({
      props,
      bindings,
   }: BaseComponentProps<ShadcnProps<"StudioStorageExplorer">>) => {
      const [bucket, setBucket] = useBoundProp<string>(
         props.bucket ?? props.buckets?.[0]?.name ?? "",
         bindings?.bucket
      );
      const [selectedFileName, setSelectedFileName] = useBoundProp<
         string | null
      >(props.selectedFileName ?? null, bindings?.selectedFileName);
      const buckets = props.buckets ?? [];
      const currentBucket = bucket || buckets[0]?.name || "";
      const files = props.filesByBucket?.[currentBucket] ?? [];
      const selectedFile =
         files.find((file) => file.name === selectedFileName) ?? null;

      return (
         <>
            <StudioSidebar title="Storage">
               <StudioSidebarGroup label="Manage" />
               <StudioSidebarItem icon={Folder} label="Files" active />
               <StudioSidebarItem icon={Shield} label="Policies" />
               <StudioSidebarGroup label="Buckets" />
               {buckets.map((item) => (
                  <StudioSidebarItem
                     key={item.name}
                     icon={item.visibility === "public" ? Globe : Lock}
                     label={item.name}
                     active={item.name === currentBucket}
                     badge={item.visibility === "public" ? "PUBLIC" : undefined}
                     onClick={() => {
                        setBucket(item.name);
                        setSelectedFileName(null);
                     }}
                  />
               ))}
               <div className="px-3 pt-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="w-full border-dashed"
                  >
                     <Plus className="size-3.5" />
                     New bucket
                  </Button>
               </div>
            </StudioSidebar>
            <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
               <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2 text-sm">
                  <Folder className="size-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Files</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">Buckets</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-mono">{currentBucket}</span>
                  <div className="flex-1" />
                  <Button variant="outline" size="xs">
                     <Shield className="size-3" />
                     Policies
                  </Button>
                  <Button variant="outline" size="xs">
                     Edit bucket
                     <ChevronDown className="size-3" />
                  </Button>
               </div>
               <div className="flex min-h-0 flex-1 overflow-hidden">
                  <section className="flex min-w-0 flex-1 flex-col border-r border-border">
                     <div className="flex items-center gap-1 border-b border-border/70 bg-card px-3 py-1.5">
                        <StudioToolbarButton
                           icon={Navigation}
                           label="Navigate"
                        />
                        <StudioToolbarButton icon={RotateCw} label="Reload" />
                        <StudioToolbarButton icon={Eye} label="View" />
                        <div className="flex-1" />
                        <StudioToolbarButton
                           icon={Upload}
                           label="Upload files"
                        />
                        <StudioToolbarButton
                           icon={FolderPlus}
                           label="Create folder"
                        />
                        <StudioIconButton label="Search" icon={Search} />
                     </div>
                     <div className="min-h-0 flex-1 overflow-auto">
                        {files.map((file) => (
                           <button
                              key={file.name}
                              onClick={() => setSelectedFileName(file.name)}
                              className={cn(
                                 "flex w-full items-center gap-3 border-b border-border/70 px-4 py-2 text-left text-sm hover:bg-muted/50",
                                 selectedFile?.name === file.name && "bg-accent"
                              )}
                           >
                              <StudioStorageFileIcon type={file.type} />
                              <span className="min-w-0 flex-1 truncate">
                                 {file.name}
                              </span>
                              <span className="font-mono text-xs text-muted-foreground">
                                 {file.size}
                              </span>
                           </button>
                        ))}
                     </div>
                  </section>
                  {selectedFile && (
                     <aside className="hidden w-80 shrink-0 overflow-auto bg-card md:block">
                        <div className="flex items-center border-b border-border px-3 py-2">
                           <div className="flex-1" />
                           <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => setSelectedFileName(null)}
                           >
                              <X className="size-3" />
                           </Button>
                        </div>
                        <div className="p-4">
                           <div className="mb-4 grid h-44 place-items-center rounded-md border border-border bg-muted/40">
                              <StudioStorageFileIcon
                                 type={selectedFile.type}
                                 large
                              />
                           </div>
                           <div className="break-all text-sm">
                              {selectedFile.name}
                           </div>
                           <div className="mb-4 mt-1 font-mono text-xs text-muted-foreground">
                              {selectedFile.type} / {selectedFile.size}
                           </div>
                           <StudioDetailRow
                              label="Last modified"
                              value={selectedFile.modified}
                           />
                           <div className="mt-5 grid grid-cols-2 gap-2">
                              <Button variant="outline" size="sm">
                                 <Download className="size-3.5" />
                                 Download
                              </Button>
                              <Button variant="outline" size="sm">
                                 <LinkIcon className="size-3.5" />
                                 Get URL
                              </Button>
                           </div>
                           <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 w-full border-destructive/40 text-destructive"
                           >
                              <Trash2 className="size-3.5" />
                              Delete file
                           </Button>
                        </div>
                     </aside>
                  )}
               </div>
            </main>
         </>
      );
   },

   StudioCodePanel: ({
      props,
   }: BaseComponentProps<ShadcnProps<"StudioCodePanel">>) => {
      return (
         <>
            <StudioSidebar title="SQL Editor">
               <StudioSidebarGroup label="Templates" />
               {(props.templates ?? []).map((template) => (
                  <StudioSidebarItem
                     key={template}
                     icon={FileText}
                     label={template}
                  />
               ))}
               <StudioSidebarGroup label="Saved" />
               {(props.savedQueries ?? []).map((query, index) => (
                  <StudioSidebarItem
                     key={query}
                     icon={FileText}
                     label={query}
                     active={index === 0}
                  />
               ))}
            </StudioSidebar>
            <main className="flex min-w-0 flex-1 flex-col bg-background">
               <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2">
                  <span className="text-sm">{props.title}</span>
                  <div className="flex-1" />
                  <Button
                     size="xs"
                     className="bg-[hsl(var(--sb-color-brand-default))] text-[hsl(var(--sb-color-foreground-contrast))]"
                  >
                     <Play className="size-3" />
                     Run
                  </Button>
               </div>
               <pre className="m-0 min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-foreground">
                  {props.code}
               </pre>
            </main>
         </>
      );
   },
};

type StudioColumn = {
   name: string;
   type: string;
   pk?: boolean | null;
   nullable?: boolean | null;
   default?: string | null;
};

type StudioTable = {
   name: string;
   rls: "unrestricted" | "rls enabled" | "protected";
   columns: StudioColumn[];
};

type StudioUser = {
   id: string;
   email: string;
   provider: "email" | "github" | "google";
   created: string;
   last?: string | null;
   confirmed: boolean;
};

function getStudioIcon(name: string): LucideIcon {
   const icons: Record<string, LucideIcon> = {
      home: Home,
      table: Table2,
      "table-2": Table2,
      sql: Terminal,
      terminal: Terminal,
      auth: KeyRound,
      "key-round": KeyRound,
      storage: Folder,
      folder: Folder,
      settings: Settings,
   };
   return icons[name] ?? Database;
}

function SupabaseIcon({ className }: { className?: string }) {
   const id = useId().replace(/:/g, "");
   const gradientId = `supabase-logo-gradient-${id}`;
   const shadeId = `supabase-logo-shade-${id}`;

   return (
      <svg
         viewBox="0 0 109 113"
         fill="none"
         aria-hidden="true"
         className={cn("size-[22px] shrink-0", className)}
      >
         <path
            d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0625L99.1935 40.0625C107.384 40.0625 111.952 49.5226 106.859 55.9372L63.7076 110.284Z"
            fill={`url(#${gradientId})`}
         />
         <path
            d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0625L99.1935 40.0625C107.384 40.0625 111.952 49.5226 106.859 55.9372L63.7076 110.284Z"
            fill={`url(#${shadeId})`}
            fillOpacity="0.2"
         />
         <path
            d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
            fill="#3ECF8E"
         />
         <defs>
            <linearGradient
               id={gradientId}
               x1="53.9738"
               y1="54.9738"
               x2="94.1635"
               y2="71.8293"
               gradientUnits="userSpaceOnUse"
            >
               <stop stopColor="#249361" />
               <stop offset="1" stopColor="#3ECF8E" />
            </linearGradient>
            <linearGradient
               id={shadeId}
               x1="36.1558"
               y1="30.5779"
               x2="54.4844"
               y2="65.0804"
               gradientUnits="userSpaceOnUse"
            >
               <stop />
               <stop offset="1" stopOpacity="0" />
            </linearGradient>
         </defs>
      </svg>
   );
}

function StudioPill({ children }: { children: React.ReactNode }) {
   return (
      <Button
         variant="outline"
         size="xs"
         className="h-7 gap-1.5 bg-transparent px-2 text-xs font-normal"
      >
         {children}
      </Button>
   );
}

function StudioMiniBadge({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <span
         className={cn(
            "rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-muted-foreground",
            className
         )}
      >
         {children}
      </span>
   );
}

function StudioIconButton({
   label,
   icon: Icon,
   badge,
}: {
   label: string;
   icon: LucideIcon;
   badge?: string;
}) {
   return (
      <Button
         variant="ghost"
         size="icon-xs"
         aria-label={label}
         title={label}
         className="relative text-muted-foreground"
      >
         <Icon className="size-3.5" />
         {badge && (
            <span className="absolute right-0.5 top-0.5 grid h-2.5 min-w-2.5 place-items-center rounded-full bg-destructive px-0.5 text-[8px] leading-none text-white">
               {badge}
            </span>
         )}
      </Button>
   );
}

function StudioSidebar({
   title,
   children,
}: {
   title: string;
   children: React.ReactNode;
}) {
   return (
      <aside className="flex w-[244px] shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar">
         <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-sm font-medium">{title}</h2>
         </div>
         <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </aside>
   );
}

function StudioSidebarGroup({ label }: { label: string }) {
   return (
      <div className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
         {label}
      </div>
   );
}

function StudioSidebarItem({
   icon: Icon,
   label,
   active,
   badge,
   onClick,
}: {
   icon: LucideIcon;
   label: string;
   active?: boolean;
   badge?: string;
   onClick?: () => void;
}) {
   return (
      <button
         onClick={onClick}
         className={cn(
            "flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            active && "bg-accent text-foreground"
         )}
      >
         <Icon className="size-3.5 shrink-0" />
         <span className="min-w-0 flex-1 truncate">{label}</span>
         {badge && <StudioMiniBadge>{badge}</StudioMiniBadge>}
      </button>
   );
}

function StudioToolbarButton({
   icon: Icon,
   label,
   tone,
   muted,
}: {
   icon: LucideIcon;
   label: string;
   tone?: "brand" | "danger";
   muted?: boolean;
}) {
   return (
      <Button
         variant="ghost"
         size="xs"
         className={cn(
            "font-normal text-muted-foreground",
            muted && "text-muted-foreground/75",
            tone === "brand" &&
               "border border-[hsl(var(--sb-color-brand-default)/0.25)] bg-[hsl(var(--sb-color-brand-default)/0.08)] text-[hsl(var(--sb-color-brand-default))] hover:bg-[hsl(var(--sb-color-brand-default)/0.12)] hover:text-[hsl(var(--sb-color-brand-default))]",
            tone === "danger" &&
               "border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive"
         )}
      >
         <Icon className="size-3" />
         <span className="hidden lg:inline">{label}</span>
      </Button>
   );
}

function studioRlsLabel(rls: StudioTable["rls"]) {
   if (rls === "unrestricted") return "UNRESTRICTED";
   if (rls === "protected") return "PROTECTED";
   return undefined;
}

function StudioRenderedValue({
   type,
   value,
}: {
   type: string;
   value: unknown;
}) {
   if (value === null || value === undefined) {
      return <span className="italic text-muted-foreground/60">NULL</span>;
   }
   if (type === "bool") {
      return (
         <span
            className={
               value
                  ? "text-[hsl(var(--sb-color-brand-default))]"
                  : "text-muted-foreground"
            }
         >
            {String(value)}
         </span>
      );
   }
   if (type === "int4" || type === "int8") {
      return (
         <span className="text-[hsl(var(--sb-color-code-block-2))]">
            {String(value)}
         </span>
      );
   }
   if (type === "uuid" || type === "timestamptz") {
      return <span className="text-muted-foreground">{String(value)}</span>;
   }
   return <span>{String(value)}</span>;
}

function StudioRowDrawer({
   table,
   row,
   mode,
   open,
   schema,
   onClose,
   onSave,
   onDelete,
}: {
   table: StudioTable | undefined;
   row: Record<string, unknown> | null;
   mode: "edit" | "insert";
   open: boolean;
   schema: string;
   onClose: () => void;
   onSave: (row: Record<string, unknown>) => void;
   onDelete: () => void;
}) {
   const initialValues = useMemo(
      () =>
         row ??
         Object.fromEntries((table?.columns ?? []).map((c) => [c.name, null])),
      [row, table]
   );
   const [values, setValues] = useState<Record<string, unknown>>(initialValues);

   useEffect(() => {
      setValues(initialValues);
   }, [initialValues]);

   if (!table) return null;

   return (
      <DrawerPrimitive
         open={open}
         onOpenChange={(next) => !next && onClose()}
         direction="right"
      >
         <DrawerContent className="dark w-[min(520px,calc(100vw-24px))] bg-background sm:max-w-none">
            <DrawerHeader className="border-b border-border">
               <div className="flex items-center gap-3">
                  {mode === "insert" ? (
                     <Plus className="size-4 text-muted-foreground" />
                  ) : (
                     <PencilLine className="size-4 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                     <DrawerTitle className="text-sm font-medium">
                        {mode === "insert" ? "Insert row" : "Update row"}
                     </DrawerTitle>
                     <DrawerDescription className="font-mono text-xs">
                        {schema}.{table.name}
                     </DrawerDescription>
                  </div>
                  <Button variant="outline" size="icon-xs" onClick={onClose}>
                     <X className="size-3" />
                  </Button>
               </div>
            </DrawerHeader>
            <div className="min-h-0 flex-1 overflow-auto p-4">
               <div className="mb-4 flex gap-2 rounded-md border border-border bg-card p-3 text-xs text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                     Columns are managed in code. Add or alter them via{" "}
                     <code className="font-mono text-foreground">
                        supalite db migrate
                     </code>
                     .
                  </span>
               </div>
               <div className="space-y-4">
                  {table.columns.map((column) => {
                     const value = values[column.name];
                     const current =
                        value === null || value === undefined
                           ? ""
                           : String(value);
                     return (
                        <div key={column.name} className="space-y-1.5">
                           <Label className="flex items-center gap-1.5 font-mono text-xs">
                              {column.pk && (
                                 <KeyRound className="size-3 text-[hsl(var(--sb-color-brand-default))]" />
                              )}
                              <span>{column.name}</span>
                              <span className="text-muted-foreground">
                                 {column.type}
                              </span>
                              {column.nullable && (
                                 <StudioMiniBadge>NULLABLE</StudioMiniBadge>
                              )}
                              {column.default && (
                                 <span className="ml-auto text-[11px] text-muted-foreground">
                                    default: {column.default}
                                 </span>
                              )}
                           </Label>
                           <div className="flex gap-2">
                              {column.type === "bool" ? (
                                 <Select
                                    value={current || "__null"}
                                    disabled={!!column.pk && mode === "edit"}
                                    onValueChange={(next) =>
                                       setValues((existing) => ({
                                          ...existing,
                                          [column.name]:
                                             next === "true"
                                                ? true
                                                : next === "false"
                                                ? false
                                                : null,
                                       }))
                                    }
                                 >
                                    <SelectTrigger className="h-8 flex-1 font-mono text-xs">
                                       <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="true">
                                          true
                                       </SelectItem>
                                       <SelectItem value="false">
                                          false
                                       </SelectItem>
                                       <SelectItem value="__null">
                                          NULL
                                       </SelectItem>
                                    </SelectContent>
                                 </Select>
                              ) : (
                                 <Input
                                    disabled={!!column.pk && mode === "edit"}
                                    value={current}
                                    placeholder="NULL"
                                    onChange={(event) =>
                                       setValues((existing) => ({
                                          ...existing,
                                          [column.name]:
                                             event.target.value === ""
                                                ? null
                                                : event.target.value,
                                       }))
                                    }
                                    className="h-8 flex-1 bg-background font-mono text-xs"
                                 />
                              )}
                              {column.nullable && (
                                 <Button
                                    variant="outline"
                                    size="xs"
                                    className="font-mono"
                                    onClick={() =>
                                       setValues((existing) => ({
                                          ...existing,
                                          [column.name]: null,
                                       }))
                                    }
                                 >
                                    NULL
                                 </Button>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="mt-auto flex flex-row items-center gap-2 border-t border-border bg-card p-4">
               {mode === "edit" && (
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={onDelete}
                     className="border-destructive/40 text-destructive hover:text-destructive"
                  >
                     <Trash2 className="size-3.5" />
                     Delete
                  </Button>
               )}
               <div className="flex-1" />
               <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
               </Button>
               <Button
                  size="sm"
                  onClick={() => onSave(values)}
                  className="bg-[hsl(var(--sb-color-brand-default))] text-[hsl(var(--sb-color-foreground-contrast))] hover:bg-[hsl(var(--sb-color-brand-default)/0.9)]"
               >
                  {mode === "insert" ? "Insert row" : "Save changes"}
               </Button>
            </div>
         </DrawerContent>
      </DrawerPrimitive>
   );
}

function StudioContentPane({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <div className={cn("mx-auto w-full max-w-6xl px-8 py-8", className)}>
         {children}
      </div>
   );
}

function StudioAvatarDot({
   seed,
   label,
   large,
}: {
   seed: string;
   label: string;
   large?: boolean;
}) {
   const hues = [153, 200, 248, 39, 280, 10, 170];
   const hue = hues[seed.charCodeAt(0) % hues.length] ?? 153;
   return (
      <span
         className={cn(
            "grid size-6 shrink-0 place-items-center rounded-full text-xs font-medium text-white",
            large && "size-9 text-sm"
         )}
         style={{
            background: `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${
               (hue + 40) % 360
            } 60% 35%))`,
         }}
      >
         {label.toUpperCase()}
      </span>
   );
}

function StudioProviderPill({
   provider,
}: {
   provider: StudioUser["provider"];
}) {
   const Icon =
      provider === "github" ? Github : provider === "google" ? Chrome : Mail;
   return (
      <Badge variant="outline" className="gap-1 rounded font-mono text-[11px]">
         <Icon className="size-3" />
         {provider}
      </Badge>
   );
}

function StudioProviderRow({
   name,
   icon: Icon,
   enabled = false,
}: {
   name: string;
   icon: LucideIcon;
   enabled?: boolean;
}) {
   return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
         <div className="grid size-8 place-items-center rounded-md bg-muted">
            <Icon className="size-4" />
         </div>
         <div className="min-w-0 flex-1">
            <div className="text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">
               {enabled ? "Enabled" : "Disabled"}
            </div>
         </div>
         <span
            className={cn(
               "relative h-[18px] w-8 rounded-full bg-muted transition-colors",
               enabled && "bg-[hsl(var(--sb-color-brand-default))]"
            )}
         >
            <span
               className={cn(
                  "absolute top-0.5 size-3.5 rounded-full bg-white transition-all",
                  enabled ? "left-4" : "left-0.5"
               )}
            />
         </span>
      </div>
   );
}

function StudioStatCard({
   label,
   value,
   delta,
   tone,
}: {
   label: string;
   value: string | number;
   delta?: string;
   tone?: "warning";
}) {
   return (
      <Card className="bg-card">
         <CardContent className="p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
               {label}
            </div>
            <div className="mt-2 text-[28px] font-normal tracking-normal">
               {value}
            </div>
            {delta && (
               <div
                  className={cn(
                     "mt-1 font-mono text-xs text-muted-foreground",
                     tone === "warning" &&
                        "text-[hsl(var(--sb-color-warning-default))]"
                  )}
               >
                  {delta}
               </div>
            )}
         </CardContent>
      </Card>
   );
}

function StudioUserDrawer({
   user,
   onClose,
}: {
   user: StudioUser | null;
   onClose: () => void;
}) {
   return (
      <DrawerPrimitive
         open={!!user}
         onOpenChange={(open) => {
            if (!open) onClose();
         }}
         direction="right"
      >
         <DrawerContent className="dark w-[min(460px,calc(100vw-24px))] bg-background sm:max-w-none">
            {user && (
               <>
                  <DrawerHeader className="border-b border-border">
                     <div className="flex items-center gap-3">
                        <StudioAvatarDot
                           seed={user.email}
                           label={user.email[0] ?? "?"}
                           large
                        />
                        <div className="min-w-0 flex-1">
                           <DrawerTitle className="truncate text-sm">
                              {user.email}
                           </DrawerTitle>
                           <DrawerDescription className="truncate font-mono text-xs">
                              {user.id}
                           </DrawerDescription>
                        </div>
                        <Button
                           variant="outline"
                           size="icon-xs"
                           onClick={onClose}
                        >
                           <X className="size-3" />
                        </Button>
                     </div>
                  </DrawerHeader>
                  <div className="min-h-0 flex-1 overflow-auto p-4">
                     <StudioDetailRow
                        label="Provider"
                        value={<StudioProviderPill provider={user.provider} />}
                     />
                     <StudioDetailRow
                        label="Confirmed"
                        value={String(user.confirmed)}
                     />
                     <StudioDetailRow label="Created at" value={user.created} />
                     <StudioDetailRow
                        label="Last sign in"
                        value={user.last ?? "-"}
                     />
                     <div className="mt-5 grid gap-2">
                        <StudioDrawerAction
                           icon={Mail}
                           label="Send magic link"
                        />
                        <StudioDrawerAction
                           icon={Lock}
                           label="Send password recovery"
                        />
                        <StudioDrawerAction icon={Ban} label="Ban user" />
                        <StudioDrawerAction
                           icon={Trash2}
                           label="Delete user"
                           danger
                        />
                     </div>
                  </div>
               </>
            )}
         </DrawerContent>
      </DrawerPrimitive>
   );
}

function StudioDetailRow({
   label,
   value,
}: {
   label: string;
   value: React.ReactNode;
}) {
   return (
      <div className="border-b border-border/70 py-2 text-sm">
         <div className="mb-1 text-xs text-muted-foreground">{label}</div>
         <div className="font-mono text-xs text-foreground">{value}</div>
      </div>
   );
}

function StudioDrawerAction({
   icon: Icon,
   label,
   danger,
}: {
   icon: LucideIcon;
   label: string;
   danger?: boolean;
}) {
   return (
      <Button
         variant="outline"
         className={cn(
            "justify-start",
            danger &&
               "border-destructive/40 text-destructive hover:text-destructive"
         )}
      >
         <Icon className="size-4" />
         {label}
      </Button>
   );
}

function StudioStorageFileIcon({
   type,
   large,
}: {
   type: string;
   large?: boolean;
}) {
   let Icon: LucideIcon = FileText;
   let color = "text-muted-foreground";
   if (type.startsWith("image/")) {
      Icon = ImageIcon;
      color = "text-[hsl(var(--sb-color-code-block-1))]";
   } else if (type === "application/pdf") {
      Icon = FileText;
      color = "text-destructive";
   } else if (type === "text/csv") {
      Icon = FileSpreadsheet;
      color = "text-[hsl(var(--sb-color-code-block-3))]";
   } else if (type === "application/gzip") {
      Icon = FileArchive;
      color = "text-[hsl(var(--sb-color-code-block-2))]";
   }
   return <Icon className={cn(color, large ? "size-10" : "size-4")} />;
}

function StudioSegmentedToggle({
   items,
   active,
}: {
   items: string[];
   active: string;
}) {
   return (
      <div className="flex rounded border border-border bg-muted/40 p-0.5 text-[11px]">
         {items.map((item) => (
            <span
               key={item}
               className={cn(
                  "rounded-sm px-2 py-0.5 text-muted-foreground",
                  item === active && "bg-muted text-foreground"
               )}
            >
               {item}
            </span>
         ))}
      </div>
   );
}

function StudioEmptyState({
   icon: Icon,
   title,
}: {
   icon: LucideIcon;
   title: string;
}) {
   return (
      <div className="grid min-h-0 flex-1 place-items-center text-center text-muted-foreground">
         <div>
            <Icon className="mx-auto mb-2 size-8 opacity-50" />
            <div className="text-sm">{title}</div>
         </div>
      </div>
   );
}
