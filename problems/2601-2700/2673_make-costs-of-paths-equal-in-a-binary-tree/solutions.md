# Solutions — Make Costs of Paths Equal in a Binary Tree

## Bottom-up sibling equalization

The heap-shaped tree means node `i`'s children are exactly `2 * i` and `2 * i + 1`, so the whole structure lives in array arithmetic — no pointers needed. Consider any internal node whose two child subtrees have already been settled so that every path inside each subtree ends at one common per-subtree maximum. The only remaining imbalance is between those two maxima, and the cheapest repair charges their difference right at this node: lifting the smaller side's maximum up here costs exactly the gap, while touching anything deeper would overpay.

That observation runs the entire algorithm: sweep internal nodes from the last parent (`n / 2`) back to the root. At each step read the two finished child maxima, add their absolute difference to the answer, and record the parent's own combined maximum as `max(left, right) + cost[node]`. Each increment is applied at the deepest shared point where it still helps every path beneath it, which is why no cheaper distribution exists; and the total can never exceed the naive bound of raising every leaf path to the global maximum with leaf-only increments.

![On the example tree cost [1,5,2,2,3,3,1], the bottom-up subtree maxima 2, 3, 3, 1 then 5, 8, 9 sit beside the sibling gaps 2, 1, 3 charged at parents 3, 2, 1 — 2 + 1 + 3 = 6 increments and every root-to-leaf path ends at 9.](figures/solution-bottom-up-gap-charges.svg)

Leaves enter already holding their own costs, so a single reverse pass suffices without recursion — the depth-`log₂(n + 1)` tree is never traversed frame by frame. Path sums stay below `height × 10⁴ ≈ 2 × 10⁵`, but those differences accumulate across roughly `n/2` internal nodes and can push past 2³¹ (the loose ceiling is leaves × height × 10⁴ ≈ 5 × 10⁹), so the accumulator and return type carry 64-bit integers throughout.

**Complexity:** `O(n)` time, `O(n)` space.
