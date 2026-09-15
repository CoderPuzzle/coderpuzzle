# Solutions — Check for Contradictions in Equations

Both readings turn the constraints into one weighted graph — names as
vertices, each `x / y = r` an edge — and ask the same question of it: do
the weights around every cycle multiply to 1? The BFS labelling settles
each component separately: flood outward from an arbitrary root, let
every name's ratio-to-root fall out of the walk, then hold each
constraint against the labels it touches. The weighted union-find never
separates the two jobs: its single pass attaches what is new and, the
moment a constraint lands between names it already links, compares it
against the ratio those names have been forced into.

## Per-component BFS ratio propagation

Names become vertices, and each constraint `x / y = r` an edge kept in
both directions: `x`'s adjacency gains `(y, 1 / r)`, `y`'s gains
`(x, r)`, so every entry carries the factor neighbor-over-name. A
component the constraints leave consistent admits a full assignment of
values, and fixing one name as the root — value 1 — pins down all the
rest: `v / root` is the product of factors along _any_ path, because
with every cycle multiplying to 1 the route cannot matter. The code
computes exactly that labelling: a plain queue seeded with an unvisited
root carrying `1.0`, spreading values breadth-first, each dequeue
labelling the neighbours still at zero.

Labels in hand, every constraint is held against them. An edge demanding
`a / b = r` meets the verdict `ratio[a] / ratio[b]`, the ratio the
labelling forced between its two names; `abs(ratio[a] / ratio[b] - r)`
past the `10^-5` tolerance means the edge closes a cycle whose product
misses 1, and the answer is `true`. The edges the flood itself walked
cannot fail — their factors set the labels, so the division hands `r`
straight back — leaving the closing edges as the only ones ever judged.
Each constraint is checked on its own, so the same pair put twice with
two different values is judged twice.

Doubles are enough: with at most a hundred factors in any label, the
corpus keeps the products within `10^±100` — far inside double range —
while the epsilon absorbs what rounding remains. Names seen in only one
constraint need no special casing, and a constraint like `w / w = 4` is
caught without effort: both endpoints share one label, leaving the check
`abs(1 - 4) > 10^-5`.

**Complexity:** `O(V + E)` time, `O(V)` space, for `E` constraints over
`V` distinct names.

## Weighted Union-Find with Ratio Checking

Model each variable as a node and each equation `a / b = w` as a weighted edge. The system is consistent exactly when the ratio between any two variables is uniquely determined by the equations seen so far. A weighted union-find maintains, for every variable `x`, its representative `parent[x]` and `weight[x] = x / parent[x]`, so the ratio of two variables in the same component is `weight[a] / weight[b]`. Path compression multiplies the weights along the way so each node's weight is updated to point directly at the root.

Process the equations in order. For `a / b = w`, find both roots together with the accumulated ratios `wa` and `wb`. If the roots differ, merge the components by attaching `root_a` under `root_b` with `weight[root_a] = wb * w / wa` — the unique value that makes the new edge consistent with the existing ratios. If the roots already coincide, the equation imposes a check rather than new information: it demands `a / b = wa / wb`, so when `abs(wa / wb - w)` exceeds the tolerance `10^-5` the equations contradict each other and the answer is `true`. If no equation ever fails the check, return `false`.

Floating-point arithmetic is safe here because the test data avoids precision traps, and the `10^-5` epsilon absorbs rounding noise. The `find` helper lazily creates singleton entries for unseen variables, so variables appearing only once are handled without special casing, and a self-loop like `a / a = v != 1` is caught naturally since both finds return the same root with `wa == wb`.

**Complexity:** `O(E α(V))` time, `O(V)` space, where `E` is the number of equations and `V` the number of distinct variables.
