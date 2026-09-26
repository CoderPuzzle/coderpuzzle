# Solutions — Flatten Deeply Nested Array

## Iterative LIFO expansion with explicit depths

An explicit stack of `[value, depth]` pairs does the flattening without a
single recursive call — important because `maxDepth` may reach 1000,
well past where recursion should be trusted under the runner's 512 KB
stack. Elements enter the worklist in reverse order so pops replay the
original left-to-right sequence; expanding a sub-array pushes ITS
children in reverse too, preserving overall order.

The single decision inside the loop is the whole spec: a value that is an
array expands only while its own depth d satisfies `d < n`, anything else
(a scalar, or a sub-array nested as deep as the budget allows) lands in
the result untouched with its entire subtree intact. That makes n=0 a
structural no-op, vanishes empty sub-arrays naturally when they qualify,
and gives fresh copies of survivors' parents without disturbing the
survivors themselves.

![With n = 1 on example 2's arr, the depth-tagged nesting tree expands every depth-0 subarray — 4,5,6 / 7,8 / 12 / 13,14,15 spill into the result in order — while [9,10,11], itself at depth 1, survives intact.](figures/solution-depth-cutoff-flatten.svg)

**Complexity:** `O(N)` time and space for `N` total nodes in the input
tree.
