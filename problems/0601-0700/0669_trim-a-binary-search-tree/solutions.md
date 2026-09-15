# Solutions — Trim a Binary Search Tree

## Child-link repair with an explicit stack

Where can the new root come from? A node below `low` drags its entire left
subtree below `low` with it, so the node is discarded and the search
continues in its right subtree; a node above `high` is the mirror image.
Walking that rule down from `root` lands on the first in-range node — the
trimmed tree's new root — or falls off the tree when nothing survives.

An in-range node's children can still be out of range, but only on one side
each: every value in a kept node's left subtree is below the node's value
and hence at most `high`, so the left link can only be broken at the low
end, the right link only at the high end. Repair is then a chain walk —
while the left child is below `low`, its own left subtree is below `low`
too, so the link is re-pointed at the child's right child; the mirror walk
fixes a right child above `high`. Every reattachment replaces an
out-of-range child link with a same-side descendant, so each surviving node
keeps exactly its original descendants — the structure-preservation rule —
and the unique-answer promise means the output is forced, never a choice.

Each repaired child is itself in range, so it goes on a stack for the same
treatment of its own children. The traversal carries that stack explicitly
rather than recursing: the tree may be a single 10^4-node chain, whose
recursion would nest 10000 calls — past CPython's default recursion limit
and over the 512k stacks the judge hands Java and Node — so every runtime
iterates instead. Every node is pushed at most once and skipped at most
once, and the stack never holds more than one entry per level of the tree
plus one.

**Complexity:** `O(n)` time, `O(h)` space for the explicit stack, where `h`
is the tree's height.
