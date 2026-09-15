# Solutions — Minimum Interval to Include Each Query

## Offline sweep with a min-heap

Processing the queries in ascending order turns each interval's life into a contiguous stretch of the sweep: an interval becomes relevant when the query value reaches its left end and stops being relevant once the query value passes its right end. Intervals sorted by left end feed the sweep through a single forward-moving pointer, so each interval is pushed exactly once.

The live intervals sit in a min-heap keyed by size `(right - left + 1)`. For a query `q`, all intervals with `left <= q` are pushed first, paired with their right end. Then the heap is lazily cleaned: while the top interval's right end is below `q`, it cannot contain `q` — nor any later, larger query — so popping and discarding it is safe. Once the top survives, it is the smallest interval containing `q`; an empty heap means the answer is `-1`.

The lazy deletion is safe for two reasons. Since queries only increase, an interval whose right end falls below the current query fails every later query as well, so discarding it is permanent and costless. And an interval that does contain `q` but sits buried in the heap under smaller dead intervals is never lost, because the dead ones are strictly smaller and get popped first. Answers are stored through the query permutation so the output comes back in the input order.

**Complexity:** `O(n log n + q log q)` time, `O(n + q)` space.
