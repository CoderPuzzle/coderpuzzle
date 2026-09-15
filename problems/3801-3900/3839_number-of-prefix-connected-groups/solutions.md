# Solutions — Number of Prefix Connected Groups

## Prefix counting

Matching on the first `k` characters is transitive: if `a` and `b` share
their first `k` characters and so do `b` and `c`, then all three share the
very same prefix. There is no chaining to discover — the pairwise condition
collapses every connected group into an equivalence class of the "first `k`
characters" map, so a group is nothing more than a single k-prefix taken by
several words, and "each pair is prefix-connected" holds exactly when the
words share that one prefix.

The code makes a single pass over `words`, skipping words shorter than `k`
(the statement's note bars them from every group) and counting each
remaining word's `k`-character prefix in a hash map. Duplicates need no
special handling — treated as separate words, they simply raise their
prefix's count. Afterwards each map entry of multiplicity at least 2 is one
connected group containing at least two words, and prefixes seen once are
would-be groups of one that the answer drops, so the method returns how many
entries reach that threshold.

Hashing a prefix costs work proportional to its length, giving `O(n·k)` time
over `n <= 5000` words with `k <= 100` and equally bounded space for the at
most `n` stored prefixes. The answer itself counts groups, so it never
exceeds `n / 2 = 2500`, far below `2³¹` — the native 32-bit integers (and
JavaScript's doubles, exact far past `2⁵³`) hold every intermediate exactly.

**Complexity:** `O(n·k)` time, `O(n·k)` space.
