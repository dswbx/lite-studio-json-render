import { useEffect, useMemo, useState } from "react";
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
   Link,
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

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "../ui/card";
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../ui/table";
import { Textarea } from "../ui/textarea";
import { cn } from "../lib/utils";

type NavId = "home" | "table" | "sql" | "auth" | "storage" | "settings";
type RlsMode = "unrestricted" | "rls enabled" | "protected";
type RowValue = string | number | boolean | null;
type DataRow = Record<string, RowValue>;

type ColumnDef = {
   name: string;
   type: "int4" | "int8" | "text" | "bool" | "uuid" | "timestamptz";
   pk?: boolean;
   nullable?: boolean;
   default?: string;
};

type DataTable = {
   name: string;
   rls: RlsMode;
   columns: ColumnDef[];
   rows: DataRow[];
};

type AuthUser = {
   id: string;
   email: string;
   provider: "email" | "github" | "google";
   created: string;
   last: string | null;
   confirmed: boolean;
};

type StorageBucket = {
   name: string;
   visibility: "public" | "private";
   files: number;
   size: string;
};

type StorageFile = {
   name: string;
   type: string;
   size: string;
   modified: string;
};

const NAV_ITEMS: Array<{ id: NavId; label: string; icon: LucideIcon }> = [
   { id: "home", label: "Home", icon: Home },
   { id: "table", label: "Table Editor", icon: Table2 },
   { id: "sql", label: "SQL Editor", icon: Terminal },
   { id: "auth", label: "Authentication", icon: KeyRound },
   { id: "storage", label: "Storage", icon: Folder },
   { id: "settings", label: "Project Settings", icon: Settings },
];

const DB_SCHEMAS = ["public", "auth", "storage"];

const DB_TABLES: Record<string, DataTable[]> = {
   public: [
      {
         name: "todos",
         rls: "unrestricted",
         columns: [
            { name: "id", type: "int4", pk: true },
            { name: "title", type: "text" },
            { name: "description", type: "text", nullable: true },
            { name: "done", type: "bool", default: "false" },
            { name: "created_at", type: "timestamptz", default: "now()" },
         ],
         rows: [
            {
               id: 1,
               title: "first todo",
               description: null,
               done: false,
               created_at: "2026-04-30 09:12:04+00",
            },
            {
               id: 2,
               title: "set up RLS",
               description: "add policies for select/update",
               done: true,
               created_at: "2026-04-30 09:14:21+00",
            },
            {
               id: 3,
               title: "write API client",
               description: "gen types from supabase-js",
               done: false,
               created_at: "2026-04-30 09:32:55+00",
            },
            {
               id: 4,
               title: "invite team",
               description: null,
               done: false,
               created_at: "2026-04-30 10:01:11+00",
            },
            {
               id: 5,
               title: "connect domain",
               description: "CNAME -> sl3.supalite.app",
               done: false,
               created_at: "2026-04-30 11:42:08+00",
            },
            {
               id: 6,
               title: "storage bucket",
               description: "create avatars, set public",
               done: true,
               created_at: "2026-04-30 12:10:33+00",
            },
         ],
      },
      {
         name: "profiles",
         rls: "rls enabled",
         columns: [
            { name: "id", type: "uuid", pk: true },
            { name: "username", type: "text" },
            { name: "avatar_url", type: "text", nullable: true },
            { name: "bio", type: "text", nullable: true },
            { name: "updated_at", type: "timestamptz", default: "now()" },
         ],
         rows: [
            {
               id: "7d2c9e...2a1",
               username: "aria",
               avatar_url: "https://cdn/u/aria.png",
               bio: "building things",
               updated_at: "2026-04-29 10:00:00+00",
            },
            {
               id: "a14b21...7e9",
               username: "finn",
               avatar_url: null,
               bio: null,
               updated_at: "2026-04-28 18:22:11+00",
            },
            {
               id: "0099fe...b21",
               username: "mxchen",
               avatar_url: "https://cdn/u/mx.png",
               bio: "pg + ts",
               updated_at: "2026-04-30 02:14:09+00",
            },
            {
               id: "e5c1ad...d44",
               username: "kai",
               avatar_url: null,
               bio: "Realtime channels for fun",
               updated_at: "2026-04-27 09:55:42+00",
            },
         ],
      },
      {
         name: "posts",
         rls: "rls enabled",
         columns: [
            { name: "id", type: "int8", pk: true },
            { name: "author_id", type: "uuid" },
            { name: "title", type: "text" },
            { name: "body", type: "text", nullable: true },
            { name: "published", type: "bool", default: "false" },
            { name: "created_at", type: "timestamptz", default: "now()" },
         ],
         rows: [
            {
               id: 101,
               author_id: "7d2c9e...2a1",
               title: "Why supalite",
               body: "The smallest viable backend.",
               published: true,
               created_at: "2026-04-29 14:00:00+00",
            },
            {
               id: 102,
               author_id: "a14b21...7e9",
               title: "Self-hosting Postgres in 2026",
               body: null,
               published: false,
               created_at: "2026-04-30 08:11:00+00",
            },
            {
               id: 103,
               author_id: "0099fe...b21",
               title: "Edge functions are deno",
               body: "and that is fine.",
               published: true,
               created_at: "2026-04-30 12:42:00+00",
            },
         ],
      },
      {
         name: "api_keys",
         rls: "rls enabled",
         columns: [
            { name: "id", type: "uuid", pk: true },
            { name: "user_id", type: "uuid" },
            { name: "label", type: "text" },
            { name: "last_used", type: "timestamptz", nullable: true },
            { name: "created_at", type: "timestamptz", default: "now()" },
         ],
         rows: [
            {
               id: "k_01",
               user_id: "7d2c9e...2a1",
               label: "cli",
               last_used: "2026-04-30 11:05:09+00",
               created_at: "2026-04-15 10:00:00+00",
            },
            {
               id: "k_02",
               user_id: "7d2c9e...2a1",
               label: "staging",
               last_used: null,
               created_at: "2026-04-22 10:00:00+00",
            },
            {
               id: "k_03",
               user_id: "0099fe...b21",
               label: "ci",
               last_used: "2026-04-30 03:14:02+00",
               created_at: "2026-04-01 10:00:00+00",
            },
         ],
      },
   ],
   auth: [
      { name: "users", rls: "protected", columns: [], rows: [] },
      { name: "sessions", rls: "protected", columns: [], rows: [] },
      { name: "refresh_tokens", rls: "protected", columns: [], rows: [] },
   ],
   storage: [
      { name: "buckets", rls: "rls enabled", columns: [], rows: [] },
      { name: "objects", rls: "rls enabled", columns: [], rows: [] },
   ],
};

const AUTH_USERS: AuthUser[] = [
   {
      id: "7d2c9e94-1a4b-4c2e-9f0a-c4a3d31a02a1",
      email: "aria@supalite.app",
      provider: "email",
      created: "2026-04-15 09:14:00",
      last: "2026-04-30 11:21:08",
      confirmed: true,
   },
   {
      id: "a14b2103-8d72-49ca-b21f-c012ee8f47e9",
      email: "finn@example.com",
      provider: "github",
      created: "2026-04-18 14:02:00",
      last: "2026-04-29 17:42:00",
      confirmed: true,
   },
   {
      id: "0099fec1-32ad-4e22-9911-9ae44e21cb21",
      email: "mxchen@gmail.com",
      provider: "google",
      created: "2026-04-22 10:55:00",
      last: "2026-04-30 03:14:02",
      confirmed: true,
   },
   {
      id: "e5c1ad77-91bb-4099-8ddc-b6f0731d4d44",
      email: "kai+test@supalite.app",
      provider: "email",
      created: "2026-04-25 18:11:00",
      last: "2026-04-30 02:08:55",
      confirmed: false,
   },
   {
      id: "4f01aabd-2e34-49c1-a4f0-1b51bee911cd",
      email: "noor@example.com",
      provider: "email",
      created: "2026-04-26 08:44:00",
      last: "2026-04-28 21:00:01",
      confirmed: true,
   },
   {
      id: "8ac2bb01-4501-4c91-92ef-2a04e1f9a3c0",
      email: "pat@example.com",
      provider: "github",
      created: "2026-04-27 12:14:00",
      last: null,
      confirmed: false,
   },
   {
      id: "12fe0098-a233-4d11-9d1c-aa14cdec8400",
      email: "sage@example.com",
      provider: "google",
      created: "2026-04-29 06:01:00",
      last: "2026-04-29 22:05:42",
      confirmed: true,
   },
];

const STORAGE_BUCKETS: StorageBucket[] = [
   { name: "avatars", visibility: "public", files: 142, size: "12.4 MB" },
   { name: "attachments", visibility: "private", files: 38, size: "212.0 MB" },
   { name: "exports", visibility: "private", files: 6, size: "1.4 GB" },
];

const STORAGE_FILES: Record<string, StorageFile[]> = {
   avatars: [
      {
         name: "aria.png",
         type: "image/png",
         size: "88.2 KB",
         modified: "2026-04-29 10:00:00",
      },
      {
         name: "mx.png",
         type: "image/png",
         size: "102.1 KB",
         modified: "2026-04-30 02:14:09",
      },
      {
         name: "finn.png",
         type: "image/png",
         size: "74.0 KB",
         modified: "2026-04-28 18:22:11",
      },
      {
         name: "__placeholder.svg",
         type: "image/svg+xml",
         size: "1.2 KB",
         modified: "2026-04-15 09:00:00",
      },
   ],
   attachments: [
      {
         name: "invoice-0042.pdf",
         type: "application/pdf",
         size: "212.4 KB",
         modified: "2026-04-22 16:01:00",
      },
      {
         name: "design-spec-v2.pdf",
         type: "application/pdf",
         size: "1.8 MB",
         modified: "2026-04-25 11:30:00",
      },
      {
         name: "export-2026-04.csv",
         type: "text/csv",
         size: "4.1 MB",
         modified: "2026-04-30 00:00:00",
      },
   ],
   exports: [
      {
         name: "db-2026-04-29.sql.gz",
         type: "application/gzip",
         size: "212.0 MB",
         modified: "2026-04-29 02:00:00",
      },
      {
         name: "db-2026-04-30.sql.gz",
         type: "application/gzip",
         size: "215.8 MB",
         modified: "2026-04-30 02:00:00",
      },
   ],
};

function buildInitialRows() {
   const rows: Record<string, DataRow[]> = {};
   for (const schema of Object.keys(DB_TABLES)) {
      for (const table of DB_TABLES[schema] ?? []) {
         rows[tableKey(schema, table.name)] = table.rows.map((row) => ({
            ...row,
         }));
      }
   }
   return rows;
}

function tableKey(schema: string, table: string) {
   return `${schema}.${table}`;
}

export default function StudioExample() {
   const [active, setActive] = useState<NavId>("table");

   useEffect(() => {
      document.documentElement.classList.add("dark");
      return () => document.documentElement.classList.remove("dark");
   }, []);

   return (
      <div className="dark h-screen overflow-hidden bg-background font-sans text-foreground">
         <TopBar />
         <div className="flex h-[calc(100vh-40px)] overflow-hidden">
            <NavRail active={active} onSelect={setActive} />
            {active === "home" && <HomeScreen />}
            {active === "table" && <TableEditor />}
            {active === "sql" && <SqlEditor />}
            {active === "auth" && <AuthScreen />}
            {active === "storage" && <StorageScreen />}
            {active === "settings" && <SettingsScreen />}
         </div>
      </div>
   );
}

function TopBar() {
   return (
      <header className="flex h-10 shrink-0 items-center gap-1.5 border-b border-border bg-sidebar px-2 text-xs">
         <SupaliteMark className="mx-1" />
         <PillButton>
            <Building2 className="size-3 opacity-70" />
            <span>Supalite PoC</span>
            <MiniBadge>STAGING</MiniBadge>
            <ChevronsUpDown className="size-3 opacity-50" />
         </PillButton>
         <Slash />
         <PillButton>
            <Database className="size-3 opacity-70" />
            <span>sl3</span>
            <ChevronsUpDown className="size-3 opacity-50" />
         </PillButton>
         <Slash />
         <PillButton>
            <span className="size-2 rounded-full bg-[hsl(var(--sb-color-brand-default))] shadow-[0_0_10px_hsl(var(--sb-color-brand-default)/0.5)]" />
            <span>main</span>
            <MiniBadge className="border-[hsl(var(--sb-color-brand-default)/0.35)] bg-[hsl(var(--sb-color-brand-default)/0.12)] text-[hsl(var(--sb-color-brand-default))]">
               SELF-HOSTED
            </MiniBadge>
         </PillButton>
         <div className="flex-1" />
         <Button variant="ghost" size="xs" className="text-muted-foreground">
            Feedback
         </Button>
         <div className="hidden min-w-44 items-center gap-2 rounded-md border border-border bg-muted/40 px-2 py-1 text-muted-foreground md:flex">
            <Search className="size-3" />
            <span className="flex-1">Search...</span>
            <kbd className="rounded border border-border px-1.5 font-mono text-[10px]">
               Ctrl K
            </kbd>
         </div>
         <IconButton label="Help" icon={HelpCircle} />
         <IconButton label="Notifications" icon={Bell} badge="3" />
         <IconButton label="Theme" icon={Palette} />
         <div className="ml-1 size-6 rounded-full bg-[linear-gradient(135deg,hsl(var(--sb-color-secondary-default)),hsl(var(--sb-color-brand-default)))]" />
      </header>
   );
}

function NavRail({
   active,
   onSelect,
}: {
   active: NavId;
   onSelect: (id: NavId) => void;
}) {
   return (
      <nav className="flex w-[52px] shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar px-2 py-2">
         <div className="mb-2 grid size-8 place-items-center">
            <SupaliteMark />
         </div>
         {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
               <Button
                  key={item.id}
                  variant="ghost"
                  size="icon-sm"
                  title={item.label}
                  aria-label={item.label}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                     "size-9 text-muted-foreground",
                     isActive &&
                        "bg-accent text-foreground hover:bg-accent hover:text-foreground",
                  )}
               >
                  <Icon className="size-[18px]" />
               </Button>
            );
         })}
         <div className="flex-1" />
         <IconButton label="Collapse" icon={PanelLeft} />
      </nav>
   );
}

function TableEditor() {
   const [schema, setSchema] = useState("public");
   const [activeTableName, setActiveTableName] = useState("todos");
   const [openTabs, setOpenTabs] = useState(["todos"]);
   const [sidebarSearch, setSidebarSearch] = useState("");
   const [rowsByTable, setRowsByTable] = useState(buildInitialRows);
   const [editing, setEditing] = useState<{
      table: DataTable;
      rowIndex: number;
      mode: "edit" | "insert";
   } | null>(null);

   const tables = DB_TABLES[schema] ?? [];
   const activeTable = tables.find((table) => table.name === activeTableName);
   const activeKey = activeTable ? tableKey(schema, activeTable.name) : "";
   const rows = rowsByTable[activeKey] ?? [];
   const filteredTables = tables.filter((table) =>
      table.name.toLowerCase().includes(sidebarSearch.toLowerCase()),
   );

   function selectSchema(nextSchema: string) {
      const nextTable = DB_TABLES[nextSchema]?.[0]?.name ?? "";
      setSchema(nextSchema);
      setActiveTableName(nextTable);
      setOpenTabs(nextTable ? [nextTable] : []);
   }

   function openTable(name: string) {
      setActiveTableName(name);
      setOpenTabs((tabs) => (tabs.includes(name) ? tabs : [...tabs, name]));
   }

   function closeTab(name: string) {
      setOpenTabs((tabs) => {
         const next = tabs.filter((tab) => tab !== name);
         if (activeTableName === name) {
            setActiveTableName(next.at(-1) ?? tables[0]?.name ?? "");
         }
         return next;
      });
   }

   function saveRow(nextRow: DataRow) {
      if (!editing || !activeTable) return;
      const key = tableKey(schema, activeTable.name);
      setRowsByTable((current) => {
         const currentRows = current[key] ?? [];
         const nextRows =
            editing.mode === "insert"
               ? [...currentRows, nextRow]
               : currentRows.map((row, index) =>
                    index === editing.rowIndex ? nextRow : row,
                 );
         return { ...current, [key]: nextRows };
      });
      setEditing(null);
   }

   function deleteRow(rowIndex: number) {
      if (!activeTable) return;
      const key = tableKey(schema, activeTable.name);
      setRowsByTable((current) => ({
         ...current,
         [key]: (current[key] ?? []).filter((_, index) => index !== rowIndex),
      }));
      setEditing(null);
   }

   return (
      <>
         <SecondarySidebar title="Table Editor">
            <div className="space-y-2 px-3 pb-3">
               <Select value={schema} onValueChange={selectSchema}>
                  <SelectTrigger size="sm" className="h-8 w-full bg-muted/30">
                     <span className="text-muted-foreground">schema</span>
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {DB_SCHEMAS.map((name) => (
                        <SelectItem key={name} value={name}>
                           {name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-2 size-3 text-muted-foreground" />
                  <Input
                     value={sidebarSearch}
                     onChange={(event) => setSidebarSearch(event.target.value)}
                     placeholder="Search tables..."
                     className="h-8 bg-background pl-8 text-xs"
                  />
               </div>
            </div>
            <SidebarGroup label={`${filteredTables.length} tables`} />
            <div className="pb-3">
               {filteredTables.map((table) => (
                  <SidebarItem
                     key={table.name}
                     icon={Table2}
                     label={table.name}
                     active={table.name === activeTableName}
                     onClick={() => openTable(table.name)}
                     badge={rlsLabel(table.rls)}
                  />
               ))}
            </div>
         </SecondarySidebar>

         <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
            <div className="flex min-h-9 items-stretch border-b border-border bg-card">
               <Button
                  variant="ghost"
                  size="icon-xs"
                  className="h-auto w-9 rounded-none border-r border-border text-muted-foreground"
               >
                  <PanelLeftClose className="size-3.5" />
               </Button>
               {openTabs.map((tab) => {
                  const isActive = tab === activeTableName;
                  return (
                     <button
                        key={tab}
                        onClick={() => setActiveTableName(tab)}
                        className={cn(
                           "flex items-center gap-1.5 border-r border-border px-3 text-xs text-muted-foreground transition-colors",
                           isActive && "bg-background text-foreground",
                        )}
                     >
                        <Table2 className="size-3.5" />
                        <span>{tab}</span>
                        <span
                           role="button"
                           tabIndex={0}
                           onClick={(event) => {
                              event.stopPropagation();
                              closeTab(tab);
                           }}
                           className="grid size-4 place-items-center rounded hover:bg-muted"
                        >
                           <X className="size-3" />
                        </span>
                     </button>
                  );
               })}
               <Button
                  variant="ghost"
                  size="icon-xs"
                  className="h-auto w-9 rounded-none border-r border-border text-muted-foreground"
               >
                  <Plus className="size-3.5" />
               </Button>
            </div>
            {activeTable ? (
               <DataTableView
                  schema={schema}
                  table={activeTable}
                  rows={rows}
                  onEdit={(rowIndex) =>
                     setEditing({ table: activeTable, rowIndex, mode: "edit" })
                  }
                  onInsert={() =>
                     setEditing({ table: activeTable, rowIndex: -1, mode: "insert" })
                  }
               />
            ) : (
               <EmptyState icon={Table2} title="Pick a table from the left" />
            )}
         </main>

         <RowDrawer
            schema={schema}
            editing={editing}
            row={editing?.mode === "edit" ? rows[editing.rowIndex] ?? null : null}
            onClose={() => setEditing(null)}
            onSave={saveRow}
            onDelete={() => editing && deleteRow(editing.rowIndex)}
         />
      </>
   );
}

function DataTableView({
   schema,
   table,
   rows,
   onEdit,
   onInsert,
}: {
   schema: string;
   table: DataTable;
   rows: DataRow[];
   onEdit: (rowIndex: number) => void;
   onInsert: () => void;
}) {
   const [filter, setFilter] = useState("");
   const visibleRows = rows
      .map((row, rowIndex) => ({ row, rowIndex }))
      .filter(({ row }) =>
         JSON.stringify(row).toLowerCase().includes(filter.toLowerCase()),
      );

   return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
         <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
            <Search className="size-3.5 text-muted-foreground" />
            <Input
               value={filter}
               onChange={(event) => setFilter(event.target.value)}
               placeholder={`Filter by ${table.columns
                  .slice(0, 3)
                  .map((column) => column.name)
                  .join(", ")} or ask AI`}
               className="h-8 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
            />
         </div>
         <div className="flex items-center gap-1 border-b border-border bg-card px-3 py-2">
            <ToolbarButton icon={ArrowDownUp} label="Sort" />
            <ToolbarButton icon={Filter} label="Filter" />
            <ToolbarButton
               icon={Lock}
               label={table.rls === "unrestricted" ? "RLS disabled" : "RLS enabled"}
               tone={table.rls === "unrestricted" ? "danger" : "brand"}
            />
            <ToolbarButton icon={Lightbulb} label="Index Advisor" />
            <ToolbarButton icon={Radio} label="Enable Realtime" />
            <div className="mx-1 h-5 w-px bg-border" />
            <ToolbarButton icon={User} label="Role: postgres" muted />
            <div className="flex-1" />
            <IconButton label="Reload" icon={RotateCw} />
            <Button
               size="xs"
               onClick={onInsert}
               className="border-[hsl(var(--sb-color-brand-default)/0.35)] bg-[hsl(var(--sb-color-brand-default)/0.12)] text-[hsl(var(--sb-color-brand-default))] hover:bg-[hsl(var(--sb-color-brand-default)/0.18)]"
            >
               <Plus className="size-3" />
               Insert
            </Button>
         </div>
         <div className="min-h-0 flex-1 overflow-auto">
            <Table className="table-fixed font-mono text-xs">
               <TableHeader className="sticky top-0 z-10 bg-card">
                  <TableRow className="hover:bg-card">
                     <TableHead className="w-9 border-r border-border/70 px-2">
                        <input
                           type="checkbox"
                           className="accent-[hsl(var(--sb-color-brand-default))]"
                        />
                     </TableHead>
                     {table.columns.map((column, index) => (
                        <TableHead
                           key={column.name}
                           className={cn(
                              "border-r border-border/70 font-sans text-xs",
                              index === 0 ? "w-28" : "w-56",
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
                  {visibleRows.map(({ row, rowIndex }) => (
                     <TableRow
                        key={rowIndex}
                        onClick={() => onEdit(rowIndex)}
                        className="h-[30px] cursor-pointer border-border/70"
                     >
                        <TableCell className="border-r border-border/70 px-2">
                           <input
                              type="checkbox"
                              onClick={(event) => event.stopPropagation()}
                              className="accent-[hsl(var(--sb-color-brand-default))]"
                           />
                        </TableCell>
                        {table.columns.map((column) => (
                           <TableCell
                              key={column.name}
                              className="overflow-hidden text-ellipsis border-r border-border/70 px-2 py-1"
                           >
                              <RenderedValue
                                 column={column}
                                 value={row[column.name] ?? null}
                              />
                           </TableCell>
                        ))}
                        <TableCell />
                     </TableRow>
                  ))}
                  {visibleRows.length === 0 && (
                     <TableRow>
                        <TableCell
                           colSpan={table.columns.length + 2}
                           className="py-12 text-center font-sans text-muted-foreground"
                        >
                           No rows match.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
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
            <span className="font-mono">
               {rows.length} record{rows.length === 1 ? "" : "s"}
            </span>
            <span className="font-mono text-muted-foreground">
               {schema}.{table.name}
            </span>
            <div className="flex-1" />
            <SegmentedToggle items={["Data", "Definition"]} active="Data" />
         </div>
      </div>
   );
}

function RowDrawer({
   schema,
   editing,
   row,
   onClose,
   onSave,
   onDelete,
}: {
   schema: string;
   editing: { table: DataTable; rowIndex: number; mode: "edit" | "insert" } | null;
   row: DataRow | null;
   onClose: () => void;
   onSave: (row: DataRow) => void;
   onDelete: () => void;
}) {
   const table = editing?.table;
   const initialValues = useMemo(() => {
      if (!table) return {};
      if (row) return { ...row };
      return Object.fromEntries(table.columns.map((column) => [column.name, null]));
   }, [row, table]);
   const [values, setValues] = useState<DataRow>(initialValues);

   useEffect(() => {
      setValues(initialValues);
   }, [initialValues]);

   return (
      <Drawer
         open={!!editing}
         onOpenChange={(open) => {
            if (!open) onClose();
         }}
         direction="right"
      >
         <DrawerContent className="dark w-[min(520px,calc(100vw-24px))] bg-background sm:max-w-none">
            {table && editing && (
               <>
                  <DrawerHeader className="border-b border-border">
                     <div className="flex items-center gap-3">
                        {editing.mode === "insert" ? (
                           <Plus className="size-4 text-muted-foreground" />
                        ) : (
                           <PencilLine className="size-4 text-muted-foreground" />
                        )}
                        <div className="min-w-0 flex-1">
                           <DrawerTitle className="text-sm font-medium">
                              {editing.mode === "insert" ? "Insert row" : "Update row"}
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
                        {table.columns.map((column) => (
                           <FieldEditor
                              key={column.name}
                              column={column}
                              value={values[column.name] ?? null}
                              disabled={!!column.pk && editing.mode === "edit"}
                              onChange={(value) =>
                                 setValues((current) => ({
                                    ...current,
                                    [column.name]: value,
                                 }))
                              }
                           />
                        ))}
                     </div>
                  </div>
                  <DrawerFooter className="flex-row items-center border-t border-border bg-card">
                     {editing.mode === "edit" && (
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
                        {editing.mode === "insert" ? "Insert row" : "Save changes"}
                     </Button>
                  </DrawerFooter>
               </>
            )}
         </DrawerContent>
      </Drawer>
   );
}

function FieldEditor({
   column,
   value,
   disabled,
   onChange,
}: {
   column: ColumnDef;
   value: RowValue;
   disabled: boolean;
   onChange: (value: RowValue) => void;
}) {
   const current = value === null || value === undefined ? "" : String(value);

   return (
      <div className="space-y-1.5">
         <Label className="flex items-center gap-1.5 font-mono text-xs">
            {column.pk && (
               <KeyRound className="size-3 text-[hsl(var(--sb-color-brand-default))]" />
            )}
            <span>{column.name}</span>
            <span className="text-muted-foreground">{column.type}</span>
            {column.nullable && <MiniBadge>NULLABLE</MiniBadge>}
            {column.default && (
               <span className="ml-auto text-[11px] text-muted-foreground">
                  default: {column.default}
               </span>
            )}
         </Label>
         <div className="flex gap-2">
            {column.type === "bool" ? (
               <Select
                  value={current}
                  onValueChange={(next) =>
                     onChange(next === "true" ? true : next === "false" ? false : null)
                  }
                  disabled={disabled}
               >
                  <SelectTrigger className="h-8 flex-1 font-mono text-xs">
                     <SelectValue placeholder="NULL" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="true">true</SelectItem>
                     <SelectItem value="false">false</SelectItem>
                     <SelectItem value="null">NULL</SelectItem>
                  </SelectContent>
               </Select>
            ) : column.type === "text" && String(value ?? "").length > 48 ? (
               <Textarea
                  disabled={disabled}
                  value={current}
                  placeholder="NULL"
                  onChange={(event) =>
                     onChange(event.target.value === "" ? null : event.target.value)
                  }
                  className="min-h-20 flex-1 resize-none bg-background font-mono text-xs"
               />
            ) : (
               <Input
                  disabled={disabled}
                  value={current}
                  placeholder="NULL"
                  onChange={(event) =>
                     onChange(event.target.value === "" ? null : event.target.value)
                  }
                  className="h-8 flex-1 bg-background font-mono text-xs"
               />
            )}
            {column.nullable && (
               <Button
                  variant="outline"
                  size="xs"
                  className="font-mono"
                  onClick={() => onChange(null)}
               >
                  NULL
               </Button>
            )}
         </div>
      </div>
   );
}

function AuthScreen() {
   const [section, setSection] = useState<"overview" | "users" | "providers">(
      "users",
   );
   const [search, setSearch] = useState("");
   const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null);
   const filteredUsers = AUTH_USERS.filter(
      (user) =>
         user.email.toLowerCase().includes(search.toLowerCase()) ||
         user.id.includes(search),
   );

   return (
      <>
         <SecondarySidebar title="Authentication">
            <SidebarGroup label="Manage" />
            <SidebarItem
               icon={Database}
               label="Overview"
               active={section === "overview"}
               onClick={() => setSection("overview")}
            />
            <SidebarItem
               icon={Users}
               label="Users"
               active={section === "users"}
               onClick={() => setSection("users")}
            />
            <SidebarItem
               icon={KeyRound}
               label="Providers"
               active={section === "providers"}
               onClick={() => setSection("providers")}
            />
            <SidebarGroup label="Configuration" />
            <SidebarItem icon={Shield} label="Policies" />
            <SidebarItem icon={Link} label="URL Configuration" />
            <SidebarItem icon={Mail} label="Email Templates" />
         </SecondarySidebar>
         <main className="min-w-0 flex-1 overflow-auto bg-background">
            {section === "users" && (
               <ContentPane>
                  <div className="mb-5 flex items-end gap-3">
                     <div className="flex-1">
                        <h2 className="text-[22px] font-normal tracking-normal">
                           Users
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                           Manage sign-ups, OTPs and password resets.
                        </p>
                     </div>
                     <MiniBadge>{AUTH_USERS.length} TOTAL</MiniBadge>
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
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by email or user ID"
                        className="bg-card pl-9"
                     />
                     <span className="absolute right-3 top-2.5 font-mono text-xs text-muted-foreground">
                        {filteredUsers.length} matches
                     </span>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                     <Table>
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
                                 onClick={() => setSelectedUser(user)}
                              >
                                 <TableCell>
                                    <div className="flex items-center gap-2">
                                       <AvatarDot
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
                                    <ProviderPill provider={user.provider} />
                                 </TableCell>
                                 <TableCell className="font-mono text-xs text-muted-foreground">
                                    {user.id.slice(0, 8)}...{user.id.slice(-4)}
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
                     </Table>
                  </div>
               </ContentPane>
            )}
            {section === "overview" && (
               <ContentPane>
                  <h2 className="mb-5 text-[22px] font-normal">Overview</h2>
                  <div className="grid gap-3 md:grid-cols-2">
                     <StatCard label="AUTH ACTIVITY" value="6" delta="+12.0%" />
                     <StatCard label="SIGN UPS" value={AUTH_USERS.length} delta="+8.0%" />
                     <StatCard label="API SUCCESS" value="100.0%" delta="0.0%" />
                     <StatCard
                        label="UNCONFIRMED"
                        value={AUTH_USERS.filter((user) => !user.confirmed).length}
                        tone="warning"
                     />
                  </div>
               </ContentPane>
            )}
            {section === "providers" && (
               <ContentPane maxWidth="max-w-3xl">
                  <h2 className="mb-5 text-[22px] font-normal">
                     Sign-in providers
                  </h2>
                  <div className="space-y-2">
                     <ProviderRow name="Email" icon={Mail} enabled />
                     <ProviderRow name="GitHub" icon={Github} enabled />
                     <ProviderRow name="Google" icon={Chrome} enabled />
                     <ProviderRow name="Magic links" icon={Sparkles} />
                  </div>
               </ContentPane>
            )}
         </main>
         <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
      </>
   );
}

function StorageScreen() {
   const [bucket, setBucket] = useState("avatars");
   const [selectedFile, setSelectedFile] = useState<StorageFile | null>(null);
   const files = STORAGE_FILES[bucket] ?? [];

   return (
      <>
         <SecondarySidebar title="Storage">
            <SidebarGroup label="Manage" />
            <SidebarItem icon={Folder} label="Files" active />
            <SidebarItem icon={Shield} label="Policies" />
            <SidebarGroup label="Buckets" />
            {STORAGE_BUCKETS.map((item) => (
               <SidebarItem
                  key={item.name}
                  icon={item.visibility === "public" ? Globe : Lock}
                  label={item.name}
                  active={item.name === bucket}
                  badge={item.visibility === "public" ? "PUBLIC" : undefined}
                  onClick={() => {
                     setBucket(item.name);
                     setSelectedFile(null);
                  }}
               />
            ))}
            <div className="px-3 pt-2">
               <Button variant="outline" size="sm" className="w-full border-dashed">
                  <Plus className="size-3.5" />
                  New bucket
               </Button>
            </div>
         </SecondarySidebar>
         <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-background">
            <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2 text-sm">
               <Folder className="size-3.5 text-muted-foreground" />
               <span className="text-muted-foreground">Files</span>
               <span className="text-muted-foreground">/</span>
               <span className="text-muted-foreground">Buckets</span>
               <span className="text-muted-foreground">/</span>
               <span className="font-mono">{bucket}</span>
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
                     <ToolbarButton icon={Navigation} label="Navigate" />
                     <ToolbarButton icon={RotateCw} label="Reload" />
                     <ToolbarButton icon={Eye} label="View" />
                     <div className="flex-1" />
                     <ToolbarButton icon={Upload} label="Upload files" />
                     <ToolbarButton icon={FolderPlus} label="Create folder" />
                     <IconButton label="Search" icon={Search} />
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">
                     {files.map((file) => (
                        <button
                           key={file.name}
                           onClick={() => setSelectedFile(file)}
                           className={cn(
                              "flex w-full items-center gap-3 border-b border-border/70 px-4 py-2 text-left text-sm hover:bg-muted/50",
                              selectedFile?.name === file.name && "bg-accent",
                           )}
                        >
                           <StorageFileIcon type={file.type} />
                           <span className="min-w-0 flex-1 truncate">{file.name}</span>
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
                           onClick={() => setSelectedFile(null)}
                        >
                           <X className="size-3" />
                        </Button>
                     </div>
                     <div className="p-4">
                        <div className="mb-4 grid h-44 place-items-center rounded-md border border-border bg-muted/40">
                           <StorageFileIcon type={selectedFile.type} large />
                        </div>
                        <div className="break-all text-sm">{selectedFile.name}</div>
                        <div className="mb-4 mt-1 font-mono text-xs text-muted-foreground">
                           {selectedFile.type} / {selectedFile.size}
                        </div>
                        <DetailRow label="Last modified" value={selectedFile.modified} />
                        <div className="mt-5 grid grid-cols-2 gap-2">
                           <Button variant="outline" size="sm">
                              <Download className="size-3.5" />
                              Download
                           </Button>
                           <Button variant="outline" size="sm">
                              <Link className="size-3.5" />
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
}

function HomeScreen() {
   return (
      <main className="min-w-0 flex-1 overflow-auto bg-background">
         <ContentPane>
            <div className="mb-7">
               <div className="flex items-center gap-3">
                  <h1 className="text-[28px] font-normal tracking-normal">sl3</h1>
                  <MiniBadge className="border-[hsl(var(--sb-color-brand-default)/0.35)] bg-[hsl(var(--sb-color-brand-default)/0.12)] text-[hsl(var(--sb-color-brand-default))]">
                     SELF-HOSTED
                  </MiniBadge>
               </div>
               <p className="mt-1 text-sm text-muted-foreground">
                  A lightweight Supabase-compatible backend. Postgres, Auth and
                  Storage, nothing more.
               </p>
            </div>
            <Card className="mb-7 bg-card">
               <CardHeader>
                  <CardTitle className="text-base">Connect</CardTitle>
                  <CardDescription>Project URL and anon key.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <CodeValue label="PROJECT URL" value="https://sl3.supalite.app" />
                  <CodeValue
                     label="ANON KEY"
                     value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsInNpZCI6InNsM2FhYjhkOSJ9.fVgK3w..."
                  />
               </CardContent>
            </Card>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
               <StatCard label="TABLES" value="5" icon={Table2} />
               <StatCard label="USERS" value="7" icon={Users} />
               <StatCard label="BUCKETS" value="3" icon={Folder} />
               <StatCard label="DB SIZE" value="24 MB" icon={Database} />
            </div>
         </ContentPane>
      </main>
   );
}

function SqlEditor() {
   return (
      <>
         <SecondarySidebar title="SQL Editor">
            <SidebarGroup label="Templates" />
            <SidebarItem icon={FileText} label="Create table" />
            <SidebarItem icon={FileText} label="Add RLS policy" />
            <SidebarItem icon={FileText} label="Top tables by size" />
            <SidebarGroup label="Saved" />
            <SidebarItem icon={FileText} label="Daily active users" active />
            <SidebarItem icon={FileText} label="Orphan rows" />
         </SecondarySidebar>
         <main className="flex min-w-0 flex-1 flex-col bg-background">
            <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2">
               <span className="text-sm">Daily active users</span>
               <div className="flex-1" />
               <Button
                  size="xs"
                  className="bg-[hsl(var(--sb-color-brand-default))] text-[hsl(var(--sb-color-foreground-contrast))]"
               >
                  <Play className="size-3" />
                  Run
               </Button>
            </div>
            <pre className="m-0 min-h-0 flex-1 overflow-auto p-5 font-mono text-sm leading-7 text-foreground">
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  select
               </span>
               {"\n  "}date_trunc(
               <span className="text-[hsl(var(--sb-color-code-block-3))]">
                  'day'
               </span>
               , last_sign_in_at){" "}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  as
               </span>{" "}
               day,{"\n  "}
               <span className="text-[hsl(var(--sb-color-code-block-1))]">
                  count
               </span>
               (*){" "}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  as
               </span>{" "}
               users{"\n"}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  from
               </span>{" "}
               auth.users{"\n"}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  where
               </span>{" "}
               last_sign_in_at{" "}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  is not null
               </span>
               {"\n"}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  group by
               </span>{" "}
               <span className="text-[hsl(var(--sb-color-code-block-2))]">
                  1
               </span>
               {"\n"}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  order by
               </span>{" "}
               <span className="text-[hsl(var(--sb-color-code-block-2))]">
                  1
               </span>{" "}
               <span className="text-[hsl(var(--sb-color-code-block-4))]">
                  desc
               </span>
               ;
            </pre>
         </main>
      </>
   );
}

function SettingsScreen() {
   return (
      <>
         <SecondarySidebar title="Settings">
            <SidebarGroup label="Configuration" />
            <SidebarItem icon={Settings} label="General" active />
            <SidebarItem icon={KeyRound} label="API Keys" />
            <SidebarItem icon={Shield} label="JWT Keys" />
         </SecondarySidebar>
         <main className="min-w-0 flex-1 overflow-auto bg-background">
            <ContentPane maxWidth="max-w-3xl">
               <h2 className="text-[22px] font-normal">Project Settings</h2>
               <p className="mb-6 mt-1 text-sm text-muted-foreground">
                  General configuration and lifecycle.
               </p>
               <Card className="bg-card">
                  <CardContent className="p-0">
                     <SettingsRow
                        label="Project name"
                        description="Displayed throughout the dashboard."
                     >
                        <Input defaultValue="sl3" className="bg-background" />
                     </SettingsRow>
                     <SettingsRow
                        label="Project ID"
                        description="Reference used in APIs and URLs."
                     >
                        <div className="flex gap-2">
                           <Input
                              readOnly
                              value="eygxbmggewdwkztnncsw"
                              className="bg-background font-mono"
                           />
                           <Button variant="outline" size="sm">
                              <Copy className="size-3.5" />
                              Copy
                           </Button>
                        </div>
                     </SettingsRow>
                  </CardContent>
               </Card>
            </ContentPane>
         </main>
      </>
   );
}

function UserDrawer({
   user,
   onClose,
}: {
   user: AuthUser | null;
   onClose: () => void;
}) {
   return (
      <Drawer
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
                        <AvatarDot
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
                        <Button variant="outline" size="icon-xs" onClick={onClose}>
                           <X className="size-3" />
                        </Button>
                     </div>
                  </DrawerHeader>
                  <div className="min-h-0 flex-1 overflow-auto p-4">
                     <DetailRow
                        label="Provider"
                        value={<ProviderPill provider={user.provider} />}
                     />
                     <DetailRow
                        label="Confirmed"
                        value={user.confirmed ? "true" : "false"}
                     />
                     <DetailRow label="Created at" value={user.created} />
                     <DetailRow label="Last sign in" value={user.last ?? "-"} />
                     <div className="mt-5 grid gap-2">
                        <DrawerAction icon={Mail} label="Send magic link" />
                        <DrawerAction icon={Lock} label="Send password recovery" />
                        <DrawerAction icon={Ban} label="Ban user" />
                        <DrawerAction icon={Trash2} label="Delete user" danger />
                     </div>
                  </div>
               </>
            )}
         </DrawerContent>
      </Drawer>
   );
}

function SecondarySidebar({
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

function SidebarGroup({ label }: { label: string }) {
   return (
      <div className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
         {label}
      </div>
   );
}

function SidebarItem({
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
            active && "bg-accent text-foreground",
         )}
      >
         <Icon className="size-3.5 shrink-0" />
         <span className="min-w-0 flex-1 truncate">{label}</span>
         {badge && <MiniBadge>{badge}</MiniBadge>}
      </button>
   );
}

function ToolbarButton({
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
               "border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive",
         )}
      >
         <Icon className="size-3" />
         <span className="hidden lg:inline">{label}</span>
      </Button>
   );
}

function IconButton({
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

function SupaliteMark({ className }: { className?: string }) {
   return (
      <div
         className={cn(
            "relative size-[22px] overflow-hidden rounded-[5px] border border-[hsl(var(--sb-color-brand-default)/0.35)] bg-[hsl(var(--sb-color-brand-default)/0.12)]",
            className,
         )}
      >
         <div className="absolute left-[4px] top-[3px] h-[16px] w-[8px] rounded-sm bg-[hsl(var(--sb-color-brand-default))]" />
         <div className="absolute right-[4px] top-[7px] h-[8px] w-[8px] rounded-sm border border-[hsl(var(--sb-color-brand-default))]" />
      </div>
   );
}

function PillButton({ children }: { children: React.ReactNode }) {
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

function Slash() {
   return <span className="px-1 text-muted-foreground/60">/</span>;
}

function MiniBadge({
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
            className,
         )}
      >
         {children}
      </span>
   );
}

function rlsLabel(rls: RlsMode) {
   if (rls === "unrestricted") return "UNRESTRICTED";
   if (rls === "protected") return "PROTECTED";
   return undefined;
}

function RenderedValue({
   column,
   value,
}: {
   column: ColumnDef;
   value: RowValue;
}) {
   if (value === null || value === undefined) {
      return <span className="italic text-muted-foreground/60">NULL</span>;
   }
   if (column.type === "bool") {
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
   if (column.type === "int4" || column.type === "int8") {
      return (
         <span className="text-[hsl(var(--sb-color-code-block-2))]">
            {String(value)}
         </span>
      );
   }
   if (column.type === "uuid" || column.type === "timestamptz") {
      return <span className="text-muted-foreground">{String(value)}</span>;
   }
   return <span>{String(value)}</span>;
}

function ProviderPill({ provider }: { provider: AuthUser["provider"] }) {
   const Icon =
      provider === "github" ? Github : provider === "google" ? Chrome : Mail;
   return (
      <Badge variant="outline" className="gap-1 rounded font-mono text-[11px]">
         <Icon className="size-3" />
         {provider}
      </Badge>
   );
}

function ProviderRow({
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
               enabled && "bg-[hsl(var(--sb-color-brand-default))]",
            )}
         >
            <span
               className={cn(
                  "absolute top-0.5 size-3.5 rounded-full bg-white transition-all",
                  enabled ? "left-4" : "left-0.5",
               )}
            />
         </span>
      </div>
   );
}

function StatCard({
   label,
   value,
   delta,
   tone,
   icon: Icon,
}: {
   label: string;
   value: string | number;
   delta?: string;
   tone?: "warning";
   icon?: LucideIcon;
}) {
   return (
      <Card className="bg-card">
         <CardContent className="p-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
               {Icon && <Icon className="size-3" />}
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
                        "text-[hsl(var(--sb-color-warning-default))]",
                  )}
               >
                  {delta}
               </div>
            )}
         </CardContent>
      </Card>
   );
}

function ContentPane({
   children,
   maxWidth = "max-w-6xl",
}: {
   children: React.ReactNode;
   maxWidth?: string;
}) {
   return (
      <div className={cn("mx-auto w-full px-8 py-8", maxWidth)}>{children}</div>
   );
}

function AvatarDot({
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
            large && "size-9 text-sm",
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

function StorageFileIcon({
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

function DetailRow({
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

function DrawerAction({
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
            danger && "border-destructive/40 text-destructive hover:text-destructive",
         )}
      >
         <Icon className="size-4" />
         {label}
      </Button>
   );
}

function CodeValue({ label, value }: { label: string; value: string }) {
   return (
      <div>
         <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {label}
         </div>
         <code className="block break-all font-mono text-sm text-[hsl(var(--sb-color-code-block-1))]">
            {value}
         </code>
      </div>
   );
}

function SettingsRow({
   label,
   description,
   children,
}: {
   label: string;
   description: string;
   children: React.ReactNode;
}) {
   return (
      <div className="grid gap-4 border-b border-border/70 p-4 last:border-0 md:grid-cols-[220px_1fr]">
         <div>
            <div className="text-sm">{label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{description}</div>
         </div>
         <div>{children}</div>
      </div>
   );
}

function SegmentedToggle({
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
                  item === active && "bg-muted text-foreground",
               )}
            >
               {item}
            </span>
         ))}
      </div>
   );
}

function EmptyState({
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
