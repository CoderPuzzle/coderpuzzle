# Solutions — Goal Parser Interpretation

The command is not an arbitrary string to search: it is a concatenation of
exactly three fixed tokens — `G`, `()`, and `(al)` — and each token maps to a
fixed replacement, concatenated in order. Token boundaries are therefore
forced by the input itself, and no token is a prefix of another except the
two parenthesized ones, which differ at their second character.

## Scan with one character of lookahead

Walk the command left to right with an index. `G` is self-identifying: emit
`G` and advance one position. An open parenthesis can only begin `()` or
`(al)`, so peek at the next character: `)` closes the token immediately —
emit `o` and advance two — while `a` must open `(al)`, so emit `al` and
advance four. The grammar guarantees the peeked position exists and that an
`a` is followed by `l)`, so the scan never validates and never backtracks;
each peek of at most two characters decides the token, exactly as the hint
suggests.

Every step consumes one whole token and appends its replacement to a string
builder, which grows amortized `O(1)` per append. The output is at most twice
the input — only `(al)` expands, from four characters to two — so a single
preallocation of the input length suffices and the final string is
materialized once at the end.

**Complexity:** `O(n)` time, `O(n)` space (output).
