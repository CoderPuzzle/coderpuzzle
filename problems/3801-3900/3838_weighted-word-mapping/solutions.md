# Solutions — Weighted Word Mapping

## Per-word weight summation

Every word contributes exactly one output letter, so the whole task is a
direct simulation of the rule. A word's weight is the sum of its characters'
entries in `weights`; the residue of that total modulo 26 then selects a
letter in reverse alphabetical order (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
Reflecting a residue `r` down from `'z'` — the character `'z' - r` — produces
exactly that reversed mapping, so no lookup table is needed.

The code walks the words in order, accumulating each word's running total
straight into `weights` indexed by the character's offset from `'a'`, and
appends one mapped letter per word. Concatenation order is input order by
construction; duplicates and equal-weight distinct words each contribute
their own letter, since the mapping depends only on the summed weight, never
on which letters produced it.

The ranges keep every arithmetic step tiny: `words[i].length <= 10` and
`weights[i] <= 100` cap each word's weight at 1,000, so a 32-bit integer
carries every total (and JavaScript's doubles are exact far below `2⁵³`).
One pass over the input characters is all the work there is.

**Complexity:** `O(n·m)` time, `O(n)` space.
