# Solutions — Count All Valid Pickup and Delivery Options

## Building the sequence one order at a time

Instead of enumerating sequences of length `2n` directly, insert the `(pickup, delivery)` pair of order `i` into an already valid sequence of `i - 1` pairs — any valid sequence can be dismantled (and rebuilt) this way by removing the highest-numbered pair, which never disturbs the validity of the others. Suppose `2(i - 1)` services are already placed, creating `2i - 1` gaps: before the first service, between any two services, and after the last.

Place the pickup `P_i` in any of those `2i - 1` gaps; once `P_i` sits in the `p`-th gap (counting from the left), `D_i` may occupy any of the `2i - 1 - p` gaps to its right. Summing over all pickup positions gives `sum_{p=0}^{2i-2} (2i - 1 - p) = 1 + 2 + ... + (2i - 1) = i * (2i - 1)` legal placements of the new pair. The count of valid sequences with `i` pairs is therefore `f(i) = f(i - 1) * i * (2i - 1)`.

The implementation is that recurrence as a loop starting from `f(1) = 1`: multiply the running result by `(2i - 1) * i` for each `i` from 2 to `n`, reducing modulo `10^9 + 7` at every step so intermediates stay small. Sanity checks match: `f(2) = 1 * 2 * 3 = 6` and `f(3) = 6 * 3 * 5 = 90`.

No memoization or arrays are needed — just an accumulator and a loop index — and `n = 1` skips the loop entirely, returning 1. The result is exact modulo the prime; no edge case exists beyond that.

**Complexity:** `O(n)` time, `O(1)` space.
