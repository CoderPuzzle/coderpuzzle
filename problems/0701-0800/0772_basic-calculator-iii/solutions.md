# Solutions — Basic Calculator III

## Recursive descent parser

Read the expression as a three-level grammar: an expression is a sum/difference of terms, a term is a product/quotient of factors, and a factor is either a number or a parenthesized expression. Encode each level as one function (`expr`, `term`, `factor`) sharing a single cursor index into the string. Precedence comes for free from the layering — `expr` only combines values that `term` has already fully multiplied out — and parentheses come for free from recursion: when `factor` sees `'('`, it recurses into `expr` and consumes the matching `')'` itself, handing control back to the level that opened it.

Each function consumes exactly the tokens it owns and leaves the cursor on the first token it does not, so the caller resumes in the right place: `term` stops at `'+'`, `'-'`, `')'`, or end of string, while `expr` stops only at `')'` or the end. Numbers are scanned as maximal runs of digits, so multi-digit operands parse correctly and the whole string is consumed exactly once.

Division must truncate toward zero, and either operand can be negative because a parenthesized subexpression may evaluate negative — `(2-8)/3` is `-2`, not `-3`. Python's `//` floors, so the parser computes `abs(a) // abs(b)` and reapplies the sign from comparing the operands' signs. Because nesting can be thousands of parentheses deep within the length bound, the recursion limit is raised; each open `'('` adds one stack frame.

**Complexity:** `O(n)` time (every character is consumed once), `O(n)` space (call stack proportional to the nesting depth).
