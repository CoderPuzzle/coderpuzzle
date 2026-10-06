import * as monaco from "monaco-editor";
import type { LanguageTable } from "./types";
import { provideCompletion, provideHover, provideSignatureHelp } from "./engine";
import { python } from "./languages/python";
import { java } from "./languages/java";
import { cpp } from "./languages/cpp";
import { go } from "./languages/go";
import { rust } from "./languages/rust";
import { sql } from "./languages/sql";

/**
 * Registers the curated providers for the languages Monaco ships no language
 * service for. JS/TS get the real worker (tsworker.ts) and deliberately no
 * curated providers, so suggestions never double up there. Registered once
 * from monaco.ts, before the first Editor mounts.
 */

const TABLES: LanguageTable[] = [python, java, cpp, go, rust, sql];

let registered = false;

export function registerIntellisense(): void {
  if (registered) return;
  registered = true;

  for (const table of TABLES) {
    monaco.languages.registerCompletionItemProvider(table.id, {
      triggerCharacters: table.triggerCharacters,
      provideCompletionItems(model, position, context) {
        return provideCompletion(model, position, table, context.triggerCharacter);
      },
    });
    if (table.id === "sql") continue; // completion only for SQL
    monaco.languages.registerHoverProvider(table.id, {
      provideHover(model, position) {
        return provideHover(model, position, table);
      },
    });
    monaco.languages.registerSignatureHelpProvider(table.id, {
      signatureHelpTriggerCharacters: ["(", ","],
      provideSignatureHelp(model, position) {
        const help = provideSignatureHelp(model, position, table);
        if (!help) return null;
        return { value: help, dispose() {} };
      },
    });
  }
}
