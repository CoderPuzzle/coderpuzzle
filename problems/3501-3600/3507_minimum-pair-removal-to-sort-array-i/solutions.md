# Solutions — Minimum Pair Removal to Sort Array I

The operation leaves no choice: every step must merge the adjacent pair
with the smallest sum, the leftmost one on ties, and the process ends the
moment the array is non-decreasing. The answer is therefore just the length
of that one forced simulation.

## Rescan simulation

Keep the array in a plain list. Each round first checks whether the array
is already non-decreasing; if not, a linear scan finds the adjacent pair
with the smallest sum — using a strict comparison so that among equal sums
the earliest (leftmost) pair wins — and replaces the pair with its sum in
place. Every merge shrinks the array by one, so at most `n - 1` rounds
happen, each costing `O(n)` for the scan and the splice.

With `n <= 50` and `|nums[i]| <= 1000` this quadratic loop is effectively
instant, and pair sums stay within a 32-bit integer (`|sum| <= 50000`),
so no wider arithmetic is needed. Heavier structures (a heap over pair
sums with a linked list) pay off only for the much larger inputs of the
follow-up version of this task.

**Complexity:** `O(n²)` time, `O(n)` space.
