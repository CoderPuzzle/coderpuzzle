# Solutions — Maximum Binary Tree

## Monotonic stack over the open right spine

The recursive definition assigns every node the maximum of its window, and the
windows nest: scanning left to right, the half-built tree's right spine holds
exactly the still-open maxima, strictly decreasing from the root down. So the
spine lives on a stack. A new value first pops every smaller top — each popped
subtree is dominated, finished, and can only hang to the new value's left —
then the last one popped, the run's largest, becomes the new node's left
child. If some larger value survives on the stack, the new node is its right
child; either way it joins the spine itself.

When a value pops a whole run, the run is already linked: each popped node
took the previously popped, smaller chain as its own right subtree, so only
the run's head needs adopting — the right links are write-once this way, which
is also what lets owned-tree Rust play along. The stack's bottom is always the
largest value seen so far, the eventual root, and when the array ends the
surviving spine is the finished tree read from the root down. A descending
input pushes a 1000-node spine and never pops until the end; an ascending
input pops exactly one node per step: every case stays flat iteration, no
recursion anywhere.

**Complexity:** `O(n)` time — each value is pushed once and popped at most
once — and `O(n)` space for the spine stack.
