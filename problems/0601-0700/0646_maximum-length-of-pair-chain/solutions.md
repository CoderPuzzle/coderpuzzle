# Solutions — Maximum Length of Pair Chain

## Greedy by Right Endpoint

The chain condition `b < c` means a pair only constrains what may come after it, never what came before. So the best strategy at every step is to take the compatible pair that ends as early as possible, leaving the most room for the rest — which is exactly what sorting by right endpoint and scanning achieves.

The solution sorts the pairs by their second element and walks through them with `current_end`, the right endpoint of the last pair taken, initialized to negative infinity. A pair is appended to the chain only when its left endpoint is strictly greater than `current_end`, at which point `current_end` advances to its right endpoint. The strict comparison encodes the problem's strict `b < c` rule, so touching intervals like `[1,2]` and `[2,3]` cannot both be taken.

Correctness follows from an exchange argument: take any optimal chain and compare it step by step with the greedy chain of the same length — each greedy choice ends no later than the corresponding optimal choice, so every subsequent optimal pair remains compatible, and the greedy chain can never fall behind. Pairs sharing a right endpoint are harmless: only the first encountered can be taken (the rest have left endpoints not exceeding that shared right end, so they fail the strict test).

Sorting is the dominant cost, and the scan is a single pass with two variables. Python's `sorted` produces the sorted copy that the space bound reflects.

**Complexity:** `O(n log n)` time, `O(n)` space.
