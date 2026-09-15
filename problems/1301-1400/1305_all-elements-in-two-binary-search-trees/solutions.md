# All Elements in Two Binary Search Trees

## Approach: In-order walks plus a linear merge

Each tree is a binary search tree, so an in-order traversal of either
tree yields its values in ascending order. Walking both trees
iteratively with an explicit stack produces two sorted lists without
recursion — a tree may be a 5000-node spine, far deeper than any
language's default recursion budget. The two sorted lists are then
merged in a single linear pass, comparing the heads and appending the
smaller element.

Because both inputs arrive already sorted, the merge needs only one
scan of each list; no general sort of the combined values is required.
The explicit stacks use O(height) memory, which is O(n) in the worst
case and O(log n) for a balanced tree.

**Complexity:** O(n₁ + n₂) time, O(n₁ + n₂) space.
