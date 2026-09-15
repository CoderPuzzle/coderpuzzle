# Solutions — Minimum Deletions to Make String Balanced

## Minimize the cost over every split point

A balanced string always has the shape of some run of `'a'`s followed by
some run of `'b'`s (either run may be empty). So instead of reasoning about
which characters to delete, it helps to reason about where the boundary
between the `'a'`-region and the `'b'`-region ends up. For a boundary placed
right before index `i`, the cheapest way to reach that shape is to delete
every `'b'` that lands to the left of the boundary and every `'a'` that
lands to the right of it — deleting anything else would be wasted work.
The answer is the minimum of that cost over every one of the `n + 1`
possible boundary positions, from "everything is a `'b'`-region" to
"everything is an `'a'`-region".

Computing each boundary's cost from scratch would be `O(n)` per position and
`O(n²)` overall, but the cost only changes by a small, predictable amount as
the boundary slides one step to the right. Start with the boundary at index
0, where the cost is simply the total count of `'a'` in `s` (nothing is
excluded from the `'b'`-deletion side yet, since it's empty). Then sweep
left to right: moving the boundary past an `'a'` removes that character from
the future `'b'`-region cost, so the running cost drops by one; moving it
past a `'b'` adds that character to the current `'a'`-region's deletion
count, so the running cost rises by one. Tracking the minimum cost seen
across the sweep — including the starting value — gives the answer in a
single pass.

**Complexity:** `O(n)` time, `O(1)` space.
