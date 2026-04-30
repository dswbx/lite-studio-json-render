import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { shadcnComponentDefinitions } from "./catalog";
import { defineRegistry } from "@json-render/react";
import { shadcnComponents } from "./components";

// Catalog: pick definitions
const catalog = defineCatalog(schema, {
   components: shadcnComponentDefinitions,
   actions: {},
});

// Registry: pick matching implementations
const { registry } = defineRegistry(catalog, {
   components: shadcnComponents,
});

export { registry, catalog };
