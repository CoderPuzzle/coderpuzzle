# Solutions — Combination Sum

Both solutions enumerate the same ways — each multiset of candidate copies
summing to `target`, once — and both pin the enumeration with the same idea:
process candidates in array order and never look backwards, so of all the
orderings of a multiset exactly one can ever be assembled. The backtracking
walks the search tree depth first, discovering a way each time a path owes
nothing. The bottom-up table turns that inside out: it settles small amounts
first and builds larger ones by extending already-finished ways, so no
branch is ever walked twice and the recursion disappears.

## Backtracking with a start index

Grow one combination at a time down a recursion that carries two things: `remaining`, the target minus the sum of what is already on the path, and `start`, the first candidate index still allowed. At each node the loop runs from `start` onward: a chosen candidate is pushed, and the recursion is entered with the **same** index `i` — not `i + 1` — because a candidate may be reused without limit, while everything before `i` stays forbidden. That index discipline pins every combination to nondecreasing candidate order, which is exactly what makes duplicates like `(2, 3, 2)` impossible while `(2, 2, 3)` is reachable once.

![The search tree for candidates [2,3,6,7] and target 7: paths keep their start index, so [2,2,3] is reachable while [2,3,2] never forms; dead ends and the two hits are marked.](figures/solution-backtracking-tree.svg)

The base case is `remaining == 0`: the path is a valid combination, and a copy of it is recorded. Candidates strictly larger than `remaining` are skipped before recursing, so a branch dies the moment it can no longer reach the target rather than one layer deeper. The skip is a `continue`, not a `break`, because the input is not assumed to be sorted — an oversized candidate says nothing about the ones after it. The shared `path` list is pushed and popped around each recursive call, so the working storage is one path, not one per branch.

With `n` candidates, target `T`, and smallest candidate `M`, the tree branches at most `n` ways to a depth of at most `T/M`, which bounds the total work (each hit also copies a path of at most that depth); the recursion stack and shared path likewise never exceed `T/M` entries, excluding the output.

**Complexity:** `O(n^(T/M))` time, `O(T/M)` space.

## Bottom Up

The recursion asks one cell of a table that is never written twice: "which
ways reach amount `t` using the first `k` candidates?" The bottom-up sweep
answers those cells directly, smallest amount first. `table[t]` lists the ways
reaching `t`, seeded by `table[0] = [ [] ]` — owing nothing has the empty way.
Then one pass per candidate — the array-order guarantee that replaced the
start index — walks amounts ascending and, at each `t`, appends `value` to a
copy of every way in `table[t - value]`.

Two rules of that loop do the backtracking's work. Ascending amounts _within_
a pass let a way already containing this candidate be extended by it again —
`table[4]` gains `[2]` and later `[2,2]` gains from `table[2]` — which is the
unlimited reuse. And the candidate-outer order pins each multiset to a single
assembly: a way is always a run of copies of some candidate, then a run of the
next, so `[2,2,4]` can be built but `[4,2,2]` never forms. Nothing is memoized
across branches; a way once recorded at `table[t]` simply sits there, ready
for every later candidate that needs it.

What the table cannot do is emit the ways in the order the search tree meets
them — its rows fill in amount order — so a final sort orders `table[target]`
lexicographically by candidate position, which is exactly the discovery order
of the depth-first walk (a way can never be a prefix of another, since the
values are positive). Each cell extension copies one way once, so the whole
sweep costs `O(n · T · W)` where `W` is the number of ways recorded; the table
itself is the only storage beyond the output.

**Complexity:** `O(n · T · W)` time, `O(T · W)` space, with `W` the number of
ways found.
