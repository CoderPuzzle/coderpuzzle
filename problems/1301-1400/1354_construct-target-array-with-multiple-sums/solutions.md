# Solutions — Construct Target Array With Multiple Sums

## Reverse simulation with a max-heap

Working forward from all-ones is hopeless because the index to enlarge is unknown. Work backward instead: every operation replaces one element with the total sum of the array at that moment, and the total strictly grows, so the largest element of any reachable state was necessarily the one written last. Reversing a step means taking the current maximum `largest` and replacing it with `largest - rest`, where `rest` is the sum of the other `n - 1` elements; the target is reachable exactly when this un-mixing process reduces every element to 1.

A max-heap (stored as negatives) repeatedly yields the maximum while a running `total` tracks the current sum, so each reversed step costs `O(log n)`. The process succeeds when the popped maximum is 1 — every other element is then also 1, since it was never larger. It fails when `largest <= rest`: the last write must have exceeded the rest of the array, so no valid predecessor exists; this also safely rejects inputs where `rest` could reach 0, because `largest <= rest` catches the degenerate case before any division.

Subtracting one `rest` at a time is too slow when values reach `10^9`, since the same element may be un-mixed many times in a row (for example `[2, 10^9]`-style gaps). Instead of one step, jump all of them at once: `steps = (largest - 1) // rest` reversals of this element can be applied simultaneously, leaving `prev = largest - steps * rest`. That is exactly `largest` reduced modulo `rest` (biased to stay in `[1, rest]`), so each such jump strictly collapses the value below the remaining sum, and only `O(log(max target))` jumps can occur per element before it becomes 1 or the process aborts.

The `n == 1` edge case is handled up front: with no "rest" to un-mix against, the only reachable target is `[1]` itself.

**Complexity:** `O(n log n log(max(target)))` time, `O(n)` space.
