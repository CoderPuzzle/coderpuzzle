# Solutions — Maximum Profit from Trading Stocks with Discounts

## Tree Knapsack with Discount States

Whether an employee can buy at half price depends only on whether their direct boss bought, so each node carries two budget profiles: f[u][b] = the best profit in u's subtree within budget b when u's boss did not buy (so u pays the full present price), and g[u][b] = the same when the boss did buy (so u may pay floor(present[u] / 2)). This local dependency is exactly why two profiles suffice — grandchildren discounts depend on u's own purchase, which the profiles already encode.

Children are merged with a bounded knapsack convolution: combine folds the children's arrays pairwise, distributing each child's spending t against every budget level b and keeping the maximum, then applies a prefix maximum so that leftover budget never lowers a value. u's tables both start from the merged children's f arrays (if u does not buy, no child gets a discount); f[u] additionally allows buying at the full price, transitioning from the children's g arrays with cost present[u], and g[u] allows the discounted purchase with cost present[u] // 2 in the same way.

Nodes are processed in reverse BFS order so a node's children are final before it is evaluated, avoiding recursion. The answer is f[root][budget] — the CEO has no boss and hence never gets a discount. With n, budget ≤ 160 and prices ≤ 50, each merge costs O(B²) in the budget dimension, which is negligible.

**Complexity:** `O(n · B²)` time (B = budget), `O(n · B)` space.
