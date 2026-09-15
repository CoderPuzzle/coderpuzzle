# Solutions — Make Costs of Paths Equal in a Binary Tree

## Bottom-up sibling equalization

The heap-shaped tree means node `i`'s children are exactly `2 * i` and `2 * i + 1`, so the whole structure lives in array arithmetic — no pointers needed. Consider any internal node whose two child subtrees have already been settled so that every path inside each subtree ends at one common per-subtree maximum. The only remaining imbalance is between those two maxima, and the cheapest repair charges their difference right at this node: lifting the smaller side's maximum up here costs exactly the gap, while touching anything deeper would overpay.

That observation runs the entire algorithm: sweep internal nodes from the last parent (`n / 2`) back to the root. At each step read the two finished child maxima, add their absolute difference to the answer, and record the parent's own combined maximum as `max(left, right) + cost[node]`. Each increment is applied at the deepest shared point where it still helps every path beneath it, which is why no cheaper distribution exists; and the total can never exceed the naive bound of raising every leaf path to the global maximum with leaf-only increments.

Leaves enter already holding their own costs, so a single reverse pass suffices without recursion — the depth-`log₂(n + 1)` tree is never traversed frame by frame. Path sums stay below `height × 10⁴ ≈ 2 × 10⁵`, but those differences accumulate across roughly `n/2` internal nodes and can push past 2³¹ (the loose ceiling is leaves × height × 10⁴ ≈ 5 × 10⁹), so the accumulator and return type carry 64-bit integers throughout.

**Complexity:** `O(n)` time, `O(n)` space.
