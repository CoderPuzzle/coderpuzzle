# Solutions — Maximum Number of Items From Sale I

The first copy of a type contributes the count of item factors divisible by its factor; later copies contribute one. For each price residue class, maintain the best previous DP offset while considering one-or-more copies, giving an O(budget) transition per type.

## Grouped unbounded knapsack

The first copy of a type contributes the count of item factors divisible by its factor; later copies contribute one. For each price residue class, maintain the best previous DP offset while considering one-or-more copies, giving an O(budget) transition per type.

**Complexity:** `O(n·budget) time, O(budget) space`.
