# Solutions — Sell Diminishing-Valued Colored Balls

## Greedy Band Selling

To maximize revenue the customer's balls should always be taken from the currently highest-valued colors, so the sale proceeds in horizontal "bands" of the value profile. Sort the inventory in descending order and append a 0 sentinel. Walking down the distinct levels, when the top `width` colors (all currently at level `h`, the next distinct level being `low`) are flattened together, the full band between `low` and `h` contributes the arithmetic series `width × (h + low + 1) × (h - low) / 2`.

The loop skips runs of equal values so `width` grows past duplicates, then either consumes the whole band — when `orders` still covers it — leaving `remaining` for lower bands, or stops inside the band: `full` complete layers of `width` balls are sold as an arithmetic series from `h` down, plus `rem` single balls at the next value `h - full`. Selling whole bands from the top is optimal because any single ball taken below the current top level is worth strictly less than a ball at the top, and the greedy never leaves a taller color untouched while selling from a shorter one.

Python's big integers make the intermediate sums exact, and the modulo `10⁹ + 7` is applied once at the end. The `remaining = 0` exit plus the `i < n - 1` bound also handle the case where the order count exactly exhausts an entire band, and the sentinel guarantees the last real level is compared against 0 rather than running off the array.

**Complexity:** `O(n log n)` time, `O(n)` space.
