import * as monaco from "monaco-editor";

/**
 * Completion-context guards: never offer suggestions inside strings or
 * comments, or after a number's decimal point. The primary source is the
 * model's cached Monarch tokens (the same grammars monaco.ts registers, so
 * the guard always agrees with what the user sees, multiline strings
 * included); the public `editor.tokenize` API is the fallback if the
 * internal accessor moves.
 */

// StandardTokenType: 0 other, 1 comment, 2 string, 3 regex.
const COMMENT = 1;
const STRING = 2;
const REGEX = 3;

interface InternalLineTokens {
  getMetadata(offset: number): number;
}

interface InternalTokenization {
  getLineTokens(lineNumber: number): InternalLineTokens;
}

// EncodedTokenAttributes layout: language id bits 0-7, standard token type
// bits 8-15.
const TOKEN_TYPE_SHIFT = 8;
const TOKEN_TYPE_MASK = 0xff;

function standardTypeAt(model: monaco.editor.ITextModel, lineNumber: number, column: number): number {
  const tokenization = (model as unknown as { tokenization?: InternalTokenization }).tokenization;
  if (tokenization) {
    try {
      const metadata = tokenization.getLineTokens(lineNumber).getMetadata(column - 1);
      return (metadata >>> TOKEN_TYPE_SHIFT) & TOKEN_TYPE_MASK;
    } catch {
      // fall through to the public API
    }
  }
  return publicStandardType(model, lineNumber, column);
}

function publicStandardType(model: monaco.editor.ITextModel, lineNumber: number, column: number): number {
  try {
    const line = model.getLineContent(lineNumber);
    // One line of text in, so result[0] is this line's tokenization.
    const tokens = monaco.editor.tokenize(line, model.getLanguageId())[0] ?? [];
    let type = "";
    for (const token of tokens) {
      if (token.offset > column - 1) break;
      type = token.type;
    }
    if (type.startsWith("comment")) return COMMENT;
    if (type.startsWith("string")) return STRING;
    if (type.startsWith("regex")) return REGEX;
  } catch {
    // tokenization unavailable — treat as code
  }
  return 0;
}

/** True when the position sits inside a string, comment, or regex literal. */
export function inStringOrComment(model: monaco.editor.ITextModel, position: monaco.Position): boolean {
  const type = standardTypeAt(model, position.lineNumber, position.column);
  return type === STRING || type === COMMENT || type === REGEX;
}

/**
 * True when the receiver expression being completed is a number mid-literal
 * ("1." or "1.5." — the walk sees "1." / "1.5" as the receiver).
 */
export function isNumericReceiver(receiver: string): boolean {
  return /^(\d[\d_]*\.?[\d_]*|0[xXbBoO][\da-fA-F_]*)$/.test(receiver.trim());
}
