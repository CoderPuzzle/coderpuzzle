# Solutions — Remove Adjacent Almost-Equal Characters

Whenever two neighboring characters are almost-equal, at least one of them
must be changed, and one operation changes exactly one character — so each
almost-equal neighbor pair forces at least one change, and pairs can be
handled left to right: fix the left one, then deal with what remains.

## Greedy left-to-right skip scan

Scan the word with index `i` starting at 1. If `word[i - 1]` and `word[i]`
are almost-equal, count one change and conceptually rewrite `word[i]` to a
letter that is almost-equal to neither neighbor — among 26 letters each
neighbor forbids at most 3 (`itself` and its two alphabet neighbors), so
such a letter always exists — then the pair `(i - 1, i)` and the pair
`(i, i + 1)` are both settled at once, and the scan jumps to `i + 2`.
Otherwise the pair is already fine and the scan moves to `i + 1`.

The jump is what makes the count minimal: settling two pairs with a single
change is only possible for overlapping pairs sharing `word[i]`, and any
leftover conflict further right starts a fresh forced change. Since the
problem never asks for the final string, the rewrite never has to be
materialized — the count is exact all the same.

**Complexity:** `O(n)` time, `O(1)` space.
