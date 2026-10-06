import * as monaco from "monaco-editor";
import type { Entry, LanguageTable, Scope } from "./types";
import { inStringOrComment, isNumericReceiver } from "./guard";

/**
 * Shared completion/hover/signature engine for the curated language tables.
 * Everything is computed on demand from the model text: the documents are
 * single-file, 100-300 line algorithm submissions, so a line-regex scope pass
 * (memoized per model version) plus a bounded backward expression walk is
 * plenty and stays instant. Unknown receivers return empty immediately —
 * Monaco's word-based suggestions remain the fallback in that case.
 */

const MAX_EXPRESSION_LENGTH = 200;
const SELF_NAMES = new Set(["self", "this"]);

// ---------------------------------------------------------------------------
// Scope memo

const scopeMemo = new WeakMap<monaco.editor.ITextModel, { versionId: number; scope: Scope }>();

function scopeOf(model: monaco.editor.ITextModel, table: LanguageTable): Scope {
  const versionId = model.getVersionId();
  const memo = scopeMemo.get(model);
  if (memo && memo.versionId === versionId) return memo.scope;
  let scope: Scope;
  try {
    scope = table.scan(model.getValue());
  } catch {
    scope = { vars: [], fields: {}, selfMethods: [], imports: [] };
  }
  scopeMemo.set(model, { versionId, scope });
  return scope;
}

function lookupVar(scope: Scope, name: string): string | null {
  for (let i = scope.vars.length - 1; i >= 0; i -= 1) {
    const type = scope.vars[i][name];
    if (type) return type;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Expression walk

/**
 * Parenthesis depth of text[0..index) — used to tell member position (same
 * depth as the cursor) from call-argument position.
 */
function depthAt(text: string, index: number): number {
  let depth = 0;
  for (let i = 0; i < index; i += 1) {
    const ch = text[i];
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
    else if (ch === ")" || ch === "]" || ch === "}") depth -= 1;
  }
  return depth;
}

/**
 * Walks backwards from `endColumn` (1-based, exclusive) on `lineText` to the
 * start of the expression: bracketed groups are skipped over whole, and
 * statement boundaries (`,`, `=`, `;`, `:`, `(` at top level, 200 chars) end
 * the walk. Returns the trimmed expression, or "".
 */
function expressionBefore(lineText: string, endColumn: number): string {
  const stop = endColumn - 1;
  const start = Math.max(0, stop - MAX_EXPRESSION_LENGTH);
  let depth = 0;
  let i = stop - 1;
  for (; i >= start; i -= 1) {
    const ch = lineText[i];
    if (ch === ")" || ch === "]" || ch === "}") {
      depth += 1;
    } else if (ch === "(" || ch === "[" || ch === "{") {
      if (depth === 0) break; // opening paren of a call / start of a literal
      depth -= 1;
    } else if (depth === 0 && (ch === "," || ch === "=" || ch === ";" || ch === ":")) {
      break;
    }
  }
  return lineText.slice(i + 1, stop).trim();
}

function wordBefore(lineText: string, endColumn: number): string {
  let start = endColumn;
  while (start > 0 && /\w/.test(lineText[start - 1] ?? "")) start -= 1;
  return lineText.slice(start, endColumn);
}

/**
 * The member context at the cursor: the receiver expression before the last
 * "." (or "->") at the same bracket depth as the cursor, plus the word being
 * typed. Null when the cursor is not in member position (e.g. inside a call's
 * argument list past its opening paren).
 */
function memberContext(
  lineText: string,
  position: monaco.Position,
): { receiver: string; prefix: string } | null {
  const before = lineText.slice(0, position.column - 1);
  if (!before) return null;
  const endDepth = depthAt(before, before.length);
  const prefix = wordBefore(lineText, position.column - 1);

  // cpp arrow access: only a complete "->" immediately followed by the word
  const arrow = before.lastIndexOf("->");
  if (arrow !== -1 && /^->\s*[A-Za-z_]\w*$/.test(before.slice(arrow))) {
    if (depthAt(before, arrow + 2) === endDepth) {
      return { receiver: expressionBefore(lineText, arrow + 1), prefix };
    }
  }

  const dot = before.lastIndexOf(".");
  if (dot === -1) return null;
  if (depthAt(before, dot + 1) !== endDepth) return null;
  return { receiver: expressionBefore(lineText, dot + 1), prefix };
}

// ---------------------------------------------------------------------------
// Receiver resolution

/** Strip one trailing `name(...)` call; returns [base, name] or null. */
function stripTrailingCall(expr: string): [string, string] | null {
  if (!expr.endsWith(")")) return null;
  let depth = 0;
  for (let i = expr.length - 1; i >= 0; i -= 1) {
    const ch = expr[i];
    if (ch === ")") depth += 1;
    else if (ch === "(") {
      depth -= 1;
      if (depth === 0) {
        const head = expr.slice(0, i);
        const match = /([A-Za-z_]\w*)$/.exec(head);
        if (!match) return null;
        return [head.slice(0, head.length - match[1].length), match[1]];
      }
    }
  }
  return null;
}

/**
 * Members for a type id, falling back to the wrapper table for prefixed ids
 * ("option:treeNode" completes with the Option members).
 */
function membersOfTypeId(typeId: string, table: LanguageTable) {
  if (table.types[typeId]) return table.types[typeId];
  const colon = typeId.indexOf(":");
  if (colon > 0 && !typeId.startsWith("module:")) return table.types[typeId.slice(0, colon)] ?? null;
  return null;
}

function resolveReceiver(expr: string, scope: Scope, table: LanguageTable): string | null {
  let current = expr.trim().replace(/[.\s]+$/, "");
  if (!current) return null;

  while (current.startsWith("(") && current.endsWith(")") && balanced(current.slice(1, -1))) {
    current = current.slice(1, -1).trim();
  }
  if (!current) return null;

  for (const [pattern, typeId] of table.typeOf) {
    if (pattern.test(current)) return typeId;
  }

  // self/this and their fields
  const selfField = /^(?:self|this)\.(\w+)$/.exec(current);
  if (selfField) return scope.fields[selfField[1]] ?? null;

  // Trailing-call chaining through the sparse returns tables. Wrapper ids
  // ("option:treeNode") map "inner" to the wrapped type, and unwrap/expect
  // pass through to it.
  const chain = stripTrailingCall(current);
  if (chain) {
    const [base, name] = chain;
    const baseType = resolveReceiver(base, scope, table);
    if (baseType && baseType !== "self") {
      const colon = baseType.indexOf(":");
      if (colon > 0 && !baseType.startsWith("module:")) {
        const wrapper = baseType.slice(0, colon);
        const inner = baseType.slice(colon + 1);
        const mapped = table.types[wrapper]?.returns?.[name];
        if (mapped === "same") return baseType;
        if (mapped === "inner") return inner;
        if (mapped) return mapped;
        if (name === "unwrap" || name === "expect") return inner || null;
      }
      return table.types[baseType]?.returns?.[name] ?? null;
    }
  }

  if (/^[A-Za-z_]\w*$/.test(current)) {
    if (SELF_NAMES.has(current)) return "self";
    const varType = lookupVar(scope, current);
    if (varType) return varType;
    if (scope.fields[current]) return scope.fields[current];
    if (table.modules?.[current]) return `module:${current}`;
  }

  if (table.receiverOf) return table.receiverOf(current, scope, table);
  return null;
}

function balanced(text: string): boolean {
  let depth = 0;
  for (const ch of text) {
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
    else if (ch === ")" || ch === "]" || ch === "}") {
      depth -= 1;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

// ---------------------------------------------------------------------------
// Item factory

const KIND_MAP: Record<string, monaco.languages.CompletionItemKind> = {
  method: monaco.languages.CompletionItemKind.Method,
  field: monaco.languages.CompletionItemKind.Field,
  variable: monaco.languages.CompletionItemKind.Variable,
  function: monaco.languages.CompletionItemKind.Function,
  class: monaco.languages.CompletionItemKind.Class,
  module: monaco.languages.CompletionItemKind.Module,
  keyword: monaco.languages.CompletionItemKind.Keyword,
  constant: monaco.languages.CompletionItemKind.Constant,
};

function snippetFor(entry: Entry): { text: string; isSnippet: boolean } {
  if (entry.args === undefined) return { text: entry.name, isSnippet: false };
  const stops = Array.from({ length: Math.max(entry.args, 0) }, (_, i) => `$${i + 1}`);
  return { text: `${entry.name}(${stops.join(", ")})$0`, isSnippet: true };
}

function entryToItem(
  entry: Entry,
  bucket: string,
  range: monaco.IRange,
): monaco.languages.CompletionItem {
  const snippet = snippetFor(entry);
  return {
    label: entry.name,
    kind: KIND_MAP[entry.kind] ?? monaco.languages.CompletionItemKind.Text,
    detail: entry.detail,
    documentation: entry.doc ? { value: entry.doc } : undefined,
    insertText: snippet.text,
    insertTextRules: snippet.isSnippet
      ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      : undefined,
    sortText: `${bucket}${entry.name}`,
    range,
  };
}

function wordRange(model: monaco.editor.ITextModel, position: monaco.Position): monaco.IRange {
  const word = model.getWordUntilPosition(position);
  return {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: word?.startColumn ?? position.column,
    endColumn: word?.endColumn ?? position.column,
  };
}

function suffixRange(position: monaco.Position, prefixLength: number): monaco.IRange {
  return {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: position.column - prefixLength,
    endColumn: position.column,
  };
}

// ---------------------------------------------------------------------------
// Providers

const EMPTY: monaco.languages.CompletionList = {
  suggestions: [],
  incomplete: false,
};

export function provideCompletion(
  model: monaco.editor.ITextModel,
  position: monaco.Position,
  table: LanguageTable,
  triggerCharacter?: string,
): monaco.languages.CompletionList {
  try {
    const lineText = model.getLineContent(position.lineNumber);
    if (inStringOrComment(model, position)) return EMPTY;

    // cpp "-": only complete on a complete "->"
    if (triggerCharacter === "-") {
      const before = lineText.slice(0, position.column - 1);
      if (!before.endsWith("->")) return EMPTY;
    }

    const member = memberContext(lineText, position);
    if (member) {
      if (isNumericReceiver(member.receiver)) return EMPTY;
      const range = suffixRange(position, member.prefix.length);
      const scope = scopeOf(model, table);
      const typeId = resolveReceiver(member.receiver, scope, table);
      if (!typeId) return EMPTY;
      if (typeId === "self") {
        const items: monaco.languages.CompletionItem[] = [];
        for (const [name, type] of Object.entries(scope.fields)) {
          items.push(entryToItem({ name, kind: "variable", detail: type }, "b0", range));
        }
        for (const name of scope.selfMethods) {
          items.push(entryToItem({ name, kind: "method", args: 0 }, "b0", range));
        }
        return { suggestions: items, incomplete: false };
      }
      if (typeId.startsWith("module:")) {
        const entries = table.modules?.[typeId.slice("module:".length)] ?? [];
        return { suggestions: entries.map((entry) => entryToItem(entry, "c0", range)), incomplete: false };
      }
      const members = membersOfTypeId(typeId, table);
      if (!members) return EMPTY;
      return {
        suggestions: members.entries.map((entry) => entryToItem(entry, "c0", range)),
        incomplete: false,
      };
    }

    // Bare identifier context (statement or argument position): scope >
    // globals > keywords. Monaco filters against the typed prefix and merges
    // its own word-based suggestions.
    const range = wordRange(model, position);
    const scope = scopeOf(model, table);
    const items: monaco.languages.CompletionItem[] = [];
    const seen = new Set<string>();
    for (const frame of scope.vars) {
      for (const [name, type] of Object.entries(frame)) {
        if (seen.has(name)) continue;
        seen.add(name);
        items.push(entryToItem({ name, kind: "variable", detail: type }, "a0", range));
      }
    }
    for (const [moduleName, entries] of Object.entries(table.modules ?? {})) {
      if (seen.has(moduleName)) continue;
      seen.add(moduleName);
      items.push(entryToItem({ name: moduleName, kind: "module" }, "d0", range));
    }
    for (const entry of table.globals) {
      if (seen.has(entry.name)) continue;
      seen.add(entry.name);
      items.push(entryToItem(entry, "d0", range));
    }
    for (const name of table.keywords) {
      if (seen.has(name)) continue;
      seen.add(name);
      items.push(entryToItem({ name, kind: "keyword" }, "e0", range));
    }
    return { suggestions: items, incomplete: false };
  } catch {
    return EMPTY;
  }
}

/** Hover: the curated doc for the member, local, or global under the cursor. */
export function provideHover(
  model: monaco.editor.ITextModel,
  position: monaco.Position,
  table: LanguageTable,
): monaco.languages.Hover | null {
  try {
    const lineText = model.getLineContent(position.lineNumber);
    if (inStringOrComment(model, position)) return null;
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    const entry = entryAt(model, lineText, position, word.word, table);
    if (!entry) return null;
    const label = entry.detail ? `${entry.name}${entry.detail}` : entry.name;
    const contents = [{ value: `\`\`\`${table.id}\n${label}\n\`\`\`` }];
    if (entry.doc) contents.push({ value: entry.doc });
    return {
      range: {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      },
      contents,
    };
  } catch {
    return null;
  }
}

function entryAt(
  model: monaco.editor.ITextModel,
  lineText: string,
  position: monaco.Position,
  word: string,
  table: LanguageTable,
): Entry | null {
  const scope = scopeOf(model, table);
  const member = memberContext(lineText, position);
  if (member) {
    const typeId = resolveReceiver(member.receiver, scope, table);
    if (!typeId || typeId === "self") return null;
    if (typeId.startsWith("module:")) {
      return table.modules?.[typeId.slice("module:".length)]?.find((e) => e.name === word) ?? null;
    }
    return membersOfTypeId(typeId, table)?.entries.find((e) => e.name === word) ?? null;
  }
  const varType = lookupVar(scope, word) ?? scope.fields[word];
  if (varType) return { name: word, kind: "variable", detail: varType };
  return table.globals.find((e) => e.name === word) ?? null;
}

/** Signature help for the innermost enclosing call on the current line. */
export function provideSignatureHelp(
  model: monaco.editor.ITextModel,
  position: monaco.Position,
  table: LanguageTable,
): monaco.languages.SignatureHelp | null {
  try {
    const lineText = model.getLineContent(position.lineNumber);
    if (inStringOrComment(model, position)) return null;
    const before = lineText.slice(0, position.column - 1);
    let depth = 0;
    let open = -1;
    for (let i = before.length - 1; i >= 0; i -= 1) {
      const ch = before[i];
      if (ch === ")") depth += 1;
      else if (ch === "(") {
        if (depth === 0) {
          open = i;
          break;
        }
        depth -= 1;
      }
    }
    if (open === -1) return null;
    const head = before.slice(0, open);
    const callMatch = /([A-Za-z_]\w*)\s*$/.exec(head);
    if (!callMatch) return null;
    const name = callMatch[1];
    const scope = scopeOf(model, table);
    let detail: string | undefined;
    let doc: string | undefined;

    const receiverText = expressionBefore(lineText, head.length - callMatch[0].length + 1);
    if (receiverText) {
      const typeId = resolveReceiver(receiverText, scope, table);
      const entry =
        typeId && typeId !== "self" && !typeId.startsWith("module:")
          ? membersOfTypeId(typeId, table)?.entries.find((e) => e.name === name)
          : undefined;
      if (entry) {
        detail = entry.detail;
        doc = entry.doc;
      } else if (typeId?.startsWith("module:")) {
        const moduleEntry = table.modules?.[typeId.slice("module:".length)]?.find(
          (e) => e.name === name,
        );
        if (moduleEntry) {
          detail = moduleEntry.detail;
          doc = moduleEntry.doc;
        }
      }
    }
    if (detail === undefined) {
      const global = table.globals.find((e) => e.name === name);
      if (global) {
        detail = global.detail;
        doc = global.doc;
      }
    }
    if (detail === undefined) return null;
    return {
      signatures: [{ label: `${name}${detail}`, parameters: [] }],
      activeSignature: 0,
      activeParameter: 0,
    };
  } catch {
    return null;
  }
}
