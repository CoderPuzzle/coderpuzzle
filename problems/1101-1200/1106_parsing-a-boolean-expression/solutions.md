# Solutions — Parsing A Boolean Expression

## Recursive Descent Parser

The grammar is directly recursive — an expression is either an atom ('t'/'f') or an operator followed by a parenthesized, comma-separated list of sub-expressions — so a recursive-descent parser over an index into the string mirrors it exactly. The parse function returns both the boolean value and the index just past the text it consumed, which lets each caller resume exactly where its child stopped without any backtracking or lookahead.

Atoms are handled first: 't' and 'f' return in O(1). Otherwise the current character is the operator; the parser skips the operator and '(' (advancing the index by 2), then repeatedly parses a sub-expression, collecting the resulting values. After each child it inspects the character the child stopped at: a comma means another operand follows, so the index advances one and the loop continues; a ')' means the operand list is done, the index advances past it, and the loop breaks. The operator then combines the collected values — NOT inverts the single value, AND takes `all`, OR takes `any` — and returns.

Nesting to depth 2·10^4 is safe because the guaranteed-valid input keeps the recursion depth bounded by the parenthesis nesting, and each call consumes at least one character, so the total work across all calls is linear in the expression length. Edge cases like a single-operand list (&(f)) or negation of a nested expression (!(&(f,t))) fall out of the same loop: the comma check simply never fires.

**Complexity:** `O(L)` time, `O(L)` space for the recursion stack, for expression length L.
