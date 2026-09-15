# Solutions — Build Binary Expression Tree From Infix Expression

## Recursive Descent Parse and Evaluate

The grammar mirrors operator precedence directly: an `expr` is a `term`
followed by zero or more `+`/`-` terms, a `term` is a `factor` followed
by zero or more `*`/`/` factors, and a `factor` is either a single digit
or a parenthesized `expr`. Three mutually recursive functions —
`parseExpr`, `parseTerm`, `parseFactor` — walk a shared cursor over `s`
and implement exactly this grammar, so parentheses and precedence fall
out of the recursion structure instead of needing explicit precedence
bookkeeping.

Each level evaluates as it parses rather than building an explicit tree
node first: `parseExpr` folds its terms together left to right with `+`
and `-` as it reads them, and `parseTerm` does the same with `*` and `/`
over its factors, which is what makes same-precedence operators apply
left to right rather than right to left. `parseFactor` either reads one
digit or, on seeing `(`, recurses into `parseExpr` and consumes the
matching `)`. Division truncates toward zero by construction (integer
division in every target language already truncates toward zero for
same-signed operands; the guarantee that `s` never divides by zero and
that every intermediate value fits a 64-bit integer means no overflow or
divide-by-zero guard is needed). This recursive evaluation is exactly
what a genuine expression-tree build-then-evaluate would compute — each
call frame corresponds to the subtree rooted at that call — so returning
the folded value where the original problem returns the tree node
recovers the tree's evaluated result without materializing it.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is `s.length` (the
recursion depth is bounded by the nesting of parentheses and precedence
levels, at most `O(n)`).
