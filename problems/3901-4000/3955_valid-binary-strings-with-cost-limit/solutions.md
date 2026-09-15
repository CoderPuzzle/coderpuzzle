# Solutions — Valid Binary Strings With Cost Limit

Left-to-right backtracking over the two placement rules the statement gives.

## Backtracking with pruning

Build the answer one index at a time. At index `i` a `'0'` is always legal,
while a `'1'` is legal only under two conditions, both checked in O(1): the
previous character is not also a `'1'` (the no-adjacent-ones rule), and
adding the new position `i` to the running cost stays within `k` (the cost
rule, since each `'1'` contributes exactly its own index). Whenever the
growing buffer reaches length `n` the string is valid by construction and
is appended to the output verbatim — no post-filtering pass needed.

Placing `'0'` before `'1'` at every branch makes the recursion enumerate
valid strings in lexicographic order, which matches the examples' listings.
The pruned tree contains exactly one node per valid prefix — a prefix is
dropped the moment either rule becomes unsatisfiable for it, and no dropped
prefix can ever gain a valid completion because both rules only tighten as
the string grows. So every completed leaf becomes an answer line and the
recursion depth is bounded by `n <= 12`, well inside every language's stack
budget.

The cost filter can only shrink the tree further: the count of binary
strings of length n without two consecutive ones is the Fibonacci number
F(n+2) (about 1.618^n), so the work is output-size times `n` in the worst
case where k admits everything.

**Complexity:** `O(n · F(n+2))` time — at most `O(2^n · n)` by the loose
per-string bound — plus output; `O(n)` extra space beyond it.
