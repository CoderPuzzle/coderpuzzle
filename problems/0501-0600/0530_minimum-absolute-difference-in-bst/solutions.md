# Solutions — Minimum Absolute Difference in BST

## Inorder walk with a running previous value

Inorder visits a BST's values in ascending order, and that single fact
confines the answer: a sorted sequence always keeps its closest pair next to
each other, because two values with a third between them are farther apart
than that middle value is from one of them. The minimum absolute difference
is therefore always a gap between values adjacent in the inorder walk —
never between values from unrelated corners of the tree — so the problem
reduces to the smallest step of one sorted traversal.

The walk holds nothing but the value it emitted just before the current one.
Each newly visited value offers exactly one candidate, the gap to that
previous value, and the minimum over all candidates is the answer. The
traversal is iterative in every language: the constraint ceiling is a single
`10^4`-node chain, and walking it recursively nests 10000 calls — past
CPython's default recursion limit and over the 512k stacks the judge hands
Java and Node — so an explicit stack of pending nodes stands in for the
call stack instead.

**Complexity:** `O(n)` time, `O(h)` space for the explicit traversal stack,
where `h` is the tree's height.
