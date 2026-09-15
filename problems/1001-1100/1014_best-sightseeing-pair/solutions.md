# Solutions — Best Sightseeing Pair

## Running maximum of values[i] + i

The score `values[i] + values[j] + i - j` (with `i < j`) splits cleanly into two independent parts: `(values[i] + i) + (values[j] - j)`. The second part depends only on `j`; the first only on the earlier index. So for each fixed `j`, the best partner is simply the maximum of `values[i] + i` over all `i < j` — no inner loop is needed.

The sweep keeps that maximum in `best_prefix`, seeded with `values[0]` (which equals `values[0] + 0`). At each `j` from 1 onward it forms `best_prefix + values[j] - j`, updates the answer `best`, and only then folds `values[j] + j` into `best_prefix` for future positions — updating after the score check is what guarantees the partner is strictly earlier. Since the constraints guarantee at least two spots, `best` is always assigned a real score.

This is exactly the `O(n^2)` double loop with the inner maximum hoisted out and maintained incrementally; nothing about the pair structure is lost, only the redundant rescanning.

**Complexity:** `O(n)` time, `O(1)` space.
