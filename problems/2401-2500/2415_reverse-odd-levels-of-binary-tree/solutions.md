# Solutions — Reverse Odd Levels of Binary Tree

## Breadth-first level mirroring

Only values move — the children stay attached — so reversing an odd level
never rewires anything: it means writing that level's value list back
mirrored, first position taking the last value and so on inward. The
natural unit of work is therefore a whole level, which makes the walk
breadth-first: a frontier of node references starts at the root, steps down
one level per round by pushing each node's two children, and every odd-
depth round mirrors its own values in place. A perfect tree keeps the
frontier rectangular — `2^depth` nodes at depth `depth` — so no null checks
are needed inside a level.

Mirroring one level is a read phase followed by a write phase: copy the
values out to a buffer, then write them back back-to-front. Doing it in two
phases rather than swapping ends inward matters in the languages where the
frontier holds references: a swap would need two live positions of the same
level simultaneously, while the buffered write needs only one node at a
time. In Rust the frontier is a `Vec<&mut TreeNode>`; stepping down reborrow
disjointly through `as_deref_mut`, so the borrow checker accepts the loop.

The root itself sits on even level 0 and never moves. Values are bounded by
`10^5`, so 32-bit integers hold everything in every language, and the
serialized answer for the largest tree (`2^14 - 1` nodes) stays well under
the output budget.

**Complexity:** `O(n)` time, `O(w)` extra space for one level's frontier and
value buffer, where `w <= 2^13` is the widest level.
