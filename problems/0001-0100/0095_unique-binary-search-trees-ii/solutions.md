# Solutions — Unique Binary Search Trees II

## Recursive range build

A binary search tree on the values `1` to `n` is determined the moment its root is fixed: some `root` in the range takes the root slot, every smaller value must live in its left subtree, and every larger value in its right subtree. So building all the trees decomposes into picking each root in ascending order and, for that root, combining every left-subtree shape with every right-subtree shape. The same question asked over a smaller value range is the same problem, which is what the recursion expresses: `build(lo, hi)` returns every BST on the values `lo` through `hi`, and an empty range returns the one-choice list holding just the null subtree, so the loop nesting never needs a special case at the leaves.

The order the statement pins falls out of the loop structure for free. Roots run from `1` to `n`; within a root, the left choices form the outer loop and the right choices the inner one, and each side's own list was produced by the same rule recursively. That is exactly the enumeration the examples display, so nothing is sorted or reordered after the fact.

Each combination allocates one fresh root node pointing at the chosen subtrees, and subtree lists are reused across combinations rather than rebuilt. With `n` capped at 8 there are at most 1430 trees, and the total work is the sum over all ranges of left-count times right-count combinations — bounded by the Catalan-number blowup the output itself already pays for.

**Complexity:** `O(n · G(n+1))` time, `O(n · G(n))` space beyond the output, where `G` is the Catalan function.
