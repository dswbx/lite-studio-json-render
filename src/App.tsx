import {
   ComponentRegistry,
   JSONUIProvider,
   Renderer,
   type Spec,
   createStateStore,
} from "@json-render/react";
import { useMemo } from "react";
import { ThemeProvider } from "./ui/theme-provider";
import { ModeToggle } from "./ui/mode-toggle";
import { registry as defaultRegistry } from "./default-registry";

export type AppProps = {
   spec: Spec | null;
   registry?: ComponentRegistry;
};

export default function App({ spec, registry: _registry }: AppProps) {
   const registry = _registry ?? defaultRegistry;
   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <div className="flex flex-col h-screen p-8 gap-4">
            <ModeToggle />
            <JSONUIProvider registry={registry}>
               <Renderer spec={spec} registry={registry} />
            </JSONUIProvider>
         </div>
      </ThemeProvider>
   );
}
