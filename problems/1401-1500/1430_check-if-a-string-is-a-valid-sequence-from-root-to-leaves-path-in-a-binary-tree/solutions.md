# Solutions — Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree

## Iterative depth-first walk down the array

The answer is decided by a walk that never needs to backtrack across
values: at depth `i` the only useful node is one whose value equals
`arr[i]`, so the search state is simply (node, index) pairs. Starting
from the root at index 0, a step to a child is viable only when the child
exists, its value is `arr[i + 1]`, and the array actually has an
`arr[i + 1]` to match — a path can neither stop early nor run past the
array's end.

Acceptance happens exactly when the walk consumes the whole array at a
leaf: index reaches `arr.length - 1` on a node with no children. A node
that matches the last element but has children is a sequence yet not a
valid one, exactly the distinction Example 3 draws.

The traversal uses an explicit stack of (node, index) pairs rather than
recursion: the tree may be a chain thousands of nodes deep, and an
explicit stack keeps the walk inside the small per-case frame budget that
a recursive DFS in the stricter language runtimes would exceed. Each node
enters the stack at most once, so the walk is linear in the tree size and
cannot revisit any prefix.

**Complexity:** `O(n)` time over the tree's `n` nodes, `O(h)` space for
the stack on a tree of height `h`.
