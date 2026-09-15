# Solutions — Cousins in Binary Tree II

## Two-phase breadth-first level rewrite

Working a whole level at a time turns the cousin-sum rule into simple
arithmetic: every child of the next level will end up with
`(next level's total) - (its parent's sibling-group total)`, where the group
total is that pair of siblings' original values. So each round gathers the
frontier's children together with their still-original values, sums them once
to get the level total, and remembers where each parent's sibling group ends;
a second sweep then walks those groups and writes the same difference into
every member. The root gets `0` outright — it has no cousins and no sibling,
so its group is empty by definition.

The read phase must complete before any write happens because all new values
are derived from original ones; within a single parent's pair the two writes
share one computed value anyway, and writes never touch values another parent
still needs, since only its own group's originals feed its own subtraction.
Levels are processed front to back with plain vectors or lists, so nothing in
the loop recurses: a path-shaped tree with `10⁵` nodes runs as `10⁵` rounds of
constant work rather than a stack anywhere near that deep, which matters for
the default recursion ceilings of Python, JavaScript, and Java.

Sums are bounded well inside 32 bits — any level holds at most half the
nodes (`≤ 5×10⁴`) times `10⁴`, i.e. under `5×10⁸` — but the implementations
carry the accumulation in 64-bit integers anyway, and the subtracted result
cast back down always fits a node value.

**Complexity:** `O(n)` time, `O(w)` extra space per round (bounded by the
widest level, `w ≤ n / 2 + 1`).
