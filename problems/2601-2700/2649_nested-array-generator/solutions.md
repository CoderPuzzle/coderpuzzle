# Solutions — Nested Array Generator

## Explicit-Stack Depth-First Generator

A generator function can simply recurse with `yield*`, and on LeetCode
that is safe. CoderPuzzle's runner pins every submission to a shallow call
stack, so instead the traversal keeps an explicit stack of frames, where
each frame is one array being iterated together with its read cursor.
Walking the structure then needs no call frames at all: peek the innermost
frame, take its next element, push a new frame for a sub-array or yield a
scalar, and pop any frame whose elements are exhausted.

Because each `next()` resumes this loop exactly where it stopped, the
integers emerge lazily in the same left-to-right order an inorder walk
produces — sub-arrays are expanded only when reached, empty arrays vanish
without contributing anything, and deeply nested single chains cost stack
space proportional to depth but zero recursion. No flattened copy of the
input is ever materialized: the frames hold references into the original
array tree, satisfying the follow-up's demand to avoid building a new
flattened version.

**Complexity:** `O(N)` time over `N` total nodes (arrays plus integers),
`O(D)` space for the frame stack where `D` is the maximum nesting depth.
