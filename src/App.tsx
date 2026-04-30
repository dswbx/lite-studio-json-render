import {
   ComponentRegistry,
   JSONUIProvider,
   Renderer,
   type Spec,
} from "@json-render/react";
import { ThemeProvider } from "./ui/theme-provider";
import { ModeToggle } from "./ui/mode-toggle";
import { registry as defaultRegistry } from "./default-registry";

export type AppProps = {
   spec: Spec | null;
   registry?: ComponentRegistry;
};

export default function App({ spec, registry: _registry }: AppProps) {
   const registry = _registry ?? defaultRegistry;
   const isStudioShell =
      !!spec?.root && spec.elements?.[spec.root]?.type === "StudioShell";

   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <div
            className={
               isStudioShell ? "h-screen" : "flex h-screen flex-col gap-4 p-8"
            }
         >
            {!isStudioShell && <ModeToggle />}
            <JSONUIProvider registry={registry} initialState={spec?.state ?? {}}>
               <Renderer spec={spec} registry={registry} />
            </JSONUIProvider>
         </div>
      </ThemeProvider>
   );
}
