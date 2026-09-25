# Solutions — Merge Two Binary Trees

## One stack of overlapping pairs

The merge rule pairs positions: two nodes occupying the same spot in both
trees overlap and their values sum, while a spot only one tree fills keeps
its node — and everything under it — exactly as it is. That lets one stack
entry settle one overlapping pair: add the two values into the first tree's
node, then settle each child slot on its own — when both trees fill the slot
the child pair joins the stack for the same treatment, and when only one
does, that side's subtree is already the merged answer below the overlap, so
it attaches whole and the walk never descends it. An input that is empty
contributes nothing, so the merge returns the other tree unchanged.

![On root1 [1,3,2,5] and root2 [2,1,3,null,4,null,7] the stack sums the three overlapping pairs 1+2, 3+1, 2+3 in place while lone subtrees 5, 4, 7 attach whole, yielding [3,4,5,5,4,null,7].](figures/solution-stack-pair-merge.svg)

Attaching instead of copying is invisible on the wire: the judge serializes
the returned tree to its level-order values and never looks at node
identity, so building the merged tree on `root1`'s nodes — summing into them
in place and reusing `root2`'s surviving subtrees — produces byte-identical
output to building a fresh tree at half the allocations. The walk itself
iterates in every language, its explicit stack of pairs carrying what
recursion otherwise would: the trees reach 2000 nodes, and a skewed chain of
them nests 2000 calls — past CPython's default recursion limit of 1000 — so
every runtime uses the stack instead. Overlapping values lie in
`[-10⁴, 10⁴]`, so a merged value never leaves ±2·10⁴; every language's
32-bit integer holds that with five orders of magnitude to spare.

**Complexity:** `O(n₁ + n₂)` time — each node of either tree is settled once
— and `O(output)` space for the merged tree the walk returns.
