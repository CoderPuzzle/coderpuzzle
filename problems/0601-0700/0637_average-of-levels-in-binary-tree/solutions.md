# Solutions — Average of Levels in Binary Tree

## Level-by-level breadth-first search, one integer sum per level

A level of the tree is exactly the set of nodes at one depth, and a queue
visits levels whole: when a round of the outer loop begins, the queue holds
precisely that level's nodes, left to right. Each round fixes that count up
front, drains exactly that many nodes off the front while appending their
children at the back, and so hands the next level, intact, to the following
round. The round accumulates its nodes' values into a running total and, when
it closes, appends that total divided by the round's count — one average per
level, top to bottom. Fixing the count is what keeps a child enqueued
mid-round from being folded into its own parents' average.

The division discipline is what makes the answers exact. Every partial total
is an integer far inside the exact range — the widest tree has `10⁴` nodes
of magnitude at most `2³¹`, so a level sums to at most about `2.2 × 10¹³`,
which `i64` holds exactly (and which stays below `2⁵³` where integers are
doubles) — so nothing rounds during accumulation. The only rounding in the
whole computation is the single division that closes each level, and IEEE
arithmetic performs that division identically in every language: both
operands are exact integers and one correctly-rounded division is
deterministic. `14.5`, `0.25`, and `1/3` therefore come out as the same
full-precision double everywhere (`0.3333333333333333`), which is exactly
what the cases expect — accumulating averages as floating point instead,
or dividing per node, would round repeatedly and drift off those pins.

**Complexity:** `O(n)` time — every node enters and leaves the queue exactly
once — and `O(width)` space for the queue, where `width` is the tree's widest
level (a full bottom row holds about half the tree).
