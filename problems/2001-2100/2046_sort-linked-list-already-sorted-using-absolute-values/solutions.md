# Solutions — Sort Linked List Already Sorted Using Absolute Values

## Move each negative node to the front

Traverse from the second node onward. When the next node is negative, unlink it from its current position and insert it before the head; otherwise advance the traversal pointer. Nonnegative nodes are never moved, so their existing nondecreasing order is preserved.

Because absolute values are nondecreasing, negative values are encountered in nonincreasing numeric order. Prepending each one reverses that order into nondecreasing order ahead of every nonnegative node. Equal values remain valid in either index order, and the rewiring reuses all original nodes without recursion or auxiliary containers.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
