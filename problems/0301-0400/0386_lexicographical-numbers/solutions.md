# Solutions — Lexicographical Numbers

## Denary trie walk

Lexicographic order compares decimal spellings digit by digit, and that is
exactly pre-order on the denary trie whose root holds 1 through 9: `1` first,
then everything spelled after it (`10`, `100`, `1000`, and so on) down its own
branch, then `2` and its branch, on to `9`. The walk never materializes that
trie. One integer, `curr`, names the node it stands on; each step emits `curr`
and moves to its immediate successor in pre-order — no sorting and no string
conversion anywhere, which is what the `O(1)` extra-space requirement is
really asking for.

The successor move has two cases. If `curr * 10 <= n`, the first child is the
tightest spelling that could come next, so the walk descends. Otherwise the
branch below `curr` is exhausted and the successor is the next sibling,
`curr + 1` — except that a node ending in `9` has no next sibling digit and a
sibling beyond `n` is out of range, so while either holds the walk retreats
`curr / 10` toward the root and increments at the first ancestor where `+1` is
legal again. For `n = 13` the turn happens at 13: `14 > 13` retreats
13 → 1 and increments to 2, exactly where the example's list continues.

Linearity holds because nothing runs away. Each of the `n` iterations appends
one number, `+1` fires at most `n` times in total, and every `/10` retreat
only undoes an earlier `*10` descent of the same digit, so climbs never
outnumber descents across the whole run — `n` emissions, at most `n` descents,
at most `n` climbs. Between iterations only `curr` survives; the answer list
is the output itself, not auxiliary space.

**Complexity:** `O(n)` time, `O(1)` extra space.
