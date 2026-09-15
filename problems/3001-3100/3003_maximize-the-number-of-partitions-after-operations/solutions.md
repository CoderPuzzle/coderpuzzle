# Solutions — Maximize the Number of Partitions After Operations

## Iterative bitmask sweep carrying the one change

Because at most one character changes, a partition is disturbed only if
it contains the changed index. So instead of re-segmenting the whole
string per replacement, run one left-to-right sweep that carries every
segmentation state reachable with the change still unspent or already
spent exactly once. A state is the letter bitmask of the currently open
partial partition, paired with how many partitions have been completed so
far; a flag (the two pools below) records whether the change was spent.

The sweep keeps two pools. The unspent pool is a single deterministic
lineage: with no change made, the greedy is forced, so one
`(mask, count)` pair describes it. The spent pool is a dictionary from
open-window mask to the best count seen for it — every position branches
the twenty-five non-identical replacement letters off the unspent lineage
into this pool, and each pool entry then advances on the real character.
Advancing a window on a character is greedy: if the letter is new and the
mask already holds `k` distinct letters, the open partition closes there
(count goes up by one, mask restarts as just that letter); otherwise the
letter joins the mask. Merging equal masks on their best count is sound
because what happens next depends only on the mask — a higher count with
the same mask dominates forever.

The answer is the best final count plus one for the last, still-open
partition (the string is non-empty). This is the shipped form: a purely
iterative sweep — no recursion anywhere — spending twenty-five
replacement trials per character and merging same-mask states so the
carried pool stays a small factor over the string length in practice.
A second, structurally different implementation (precomputed prefix/
suffix partition tables resolved with next-occurrence jump walks, after
the hint sketch) produced identical answers on every case this bundle
ships, including both stress inputs.

**Complexity:** `O(26 · n)` time for the sweep's branching plus merging
the carried pool — bounded by the number of distinct open-window letter
sets alive at each position, small in practice — and `O(n)` space for
that pool across the sweep.
