# Solutions — Minimum Number of Operations to Make Word K-Periodic

## Block frequency counting

Every operation copies an existing length-`k` block over another block, so
a single replacement makes its target block correct for free, and the
contents reachable in the final string are always among the contents
already present: copying never invents a new block. To finish k-periodic,
all `n / k` blocks must share one content `s`, and because `s` can never be
newer than the input, `s` is one of the original blocks. Keeping every
occurrence of the most frequent original block untouched and overwriting
each remaining block once achieves exactly `blocks - maxFrequency`
operations, and no plan can do better since at least that many blocks are
wrong relative to whichever content survives.

The algorithm is therefore a single pass cutting `word` into `n / k` slices
of length `k`, counting identical slices in a hash map keyed by the slice
text, and returning the block count minus the largest count. The scan does
constant work per character overall (`sum of slice costs` telescopes to
`n`), and the map holds at most one entry per distinct block.

**Complexity:** `O(n)` time, `O(n)` space.
