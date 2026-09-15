# Solutions — Bitwise ORs of Subarrays

## Rolling Set of Suffix ORs

Let `cur` be the set of distinct OR values of all subarrays ending at the current index. When the scan advances to a new element `x`, every subarray ending here is either `[x]` alone or a subarray ending at the previous index extended by `x`, whose OR is `x | y` for some `y` in the old set. So `cur` becomes `{x}` unioned with `{x | y}` over the old set, and each step also unions the fresh `cur` into one global answer set.

Naively these sets could be huge, but OR never clears bits: along any chain of ever-longer suffixes, the OR values form a chain of nested bit sets where each distinct value adds at least one bit. With `b`-bit values, `cur` therefore holds at most `b + 1` distinct values — about 31 for values up to 10^9 — making every step `O(b)` even though the subarrays themselves number in the millions.

The global set accumulates the union over all ending positions, and its size is the answer. `arr = [0]` correctly yields 1, and duplicate values collapse naturally since sets deduplicate them.

**Complexity:** `O(n·b)` time, `O(n·b)` space.
