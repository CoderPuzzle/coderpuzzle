import * as monaco from "monaco-editor";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

/**
 * Monaco's TypeScript language service — the same engine VS Code uses for
 * JS/TS. tsMode requests its worker under the "typescript"/"javascript"
 * labels and only ever adds semantic providers (completion, hover, signature
 * help, diagnostics); tokenization stays with the enhanced Monarch grammars
 * registered in monaco.ts. Diagnostics are deliberately lenient: algorithm
 * submissions must not drown in squiggles.
 */

/** Bundle-provided types, as declared by the problems' provided/typescript
 * sources; gives the worker completions, hover, and correct diagnostics for
 * TreeNode/ListNode/... without any curated table. */
const BUNDLE_TYPES_DTS = `
declare class TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; constructor(val?: number); }
declare class ListNode { val: number; next: ListNode | null; constructor(val?: number, next?: ListNode | null); }
declare class GraphNode { val: number; neighbors: GraphNode[]; constructor(val?: number, neighbors?: GraphNode[]); }
declare class Node { val: number; neighbors: Node[]; next: Node | null; random: Node | null; }
declare class RandomListNode { val: number; next: RandomListNode | null; random: RandomListNode | null; }
declare class MultiListNode { val: number; prev: MultiListNode | null; next: MultiListNode | null; child: MultiListNode | null; }
declare class QuadNode { val: boolean; isLeaf: boolean; topLeft: QuadNode | null; topRight: QuadNode | null; bottomLeft: QuadNode | null; bottomRight: QuadNode | null; }
declare class NodeWithNext { val: number; left: NodeWithNext | null; right: NodeWithNext | null; next: NodeWithNext | null; }
declare class NestedInteger {}
interface GridMaster { canMove(direction: string): boolean; move(direction: string): number; isTarget(): boolean; }
`;

export function setupTypeScriptWorker(): void {
  // Lenient on purpose: the runner's tsc gate is authoritative; the editor
  // should flag typos and type misuse without nagging about style.
  const options: monaco.languages.typescript.CompilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    lib: ["es2020", "dom", "dom.iterable"],
    allowNonTsExtensions: true,
    strict: false,
    noImplicitAny: false,
    strictNullChecks: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noUnusedLabels: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    noFallthroughCasesInSwitch: false,
  };
  const diagnostics: monaco.languages.typescript.DiagnosticsOptions = {
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: true,
    diagnosticCodesToIgnore: [6133],
  };
  // allowJs MUST stay off on the TypeScript defaults: models have
  // extension-less in-memory URIs, and the worker picks the script kind with
  // `allowJs ? JS : TS` — with allowJs on, TS starters get parsed as
  // JavaScript ("Type annotations can only be used in TypeScript files").
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({ ...options });
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ ...diagnostics });
  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    BUNDLE_TYPES_DTS,
    "coderpuzzle-bundle-types.d.ts",
  );
  // The JavaScript service: allowJs is what routes its extension-less models
  // to the JS parser. checkJs starts lenient-on to catch typos in JS starters
  // too; flip it off if real-world starters show noise (see
  // docs/EDITOR-AUTOCOMPLETE.md).
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    ...options,
    allowJs: true,
    checkJs: true,
  });
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({ ...diagnostics });
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    BUNDLE_TYPES_DTS,
    "coderpuzzle-bundle-types.d.ts",
  );
}

// Re-exported so monaco.ts keeps a single import site for the worker module.
export { tsWorker };
