# Solutions — Two Sum BSTs

## In-order to sorted arrays, then two pointers

An in-order walk of a binary search tree lists its values in ascending order,
so collecting both walks turns the problem into the classic Two Sum on two
sorted arrays. The traversals are iterative — an explicit stack drives them —
because a degenerate 5000-node tree would otherwise recurse deeper than the
smallest judged stacks allow.

With `a` (from `root1`) ascending and `b` (from `root2`) scanned from a
descending index, the pair sum can only be moved toward `target` in one
direction per step: too small advances the `a` pointer, too large retreats
the `b` pointer. Every value pair is excluded only when at least one of its
members provably cannot participate, so the scan finds a matching pair iff
one exists.

The answer is `true` the moment the pointers meet on `target`; `false` when
either pointer runs off its array.

**Complexity:** `O(n₁ + n₂)` time, `O(n₁ + n₂)` space for the two value
arrays.
