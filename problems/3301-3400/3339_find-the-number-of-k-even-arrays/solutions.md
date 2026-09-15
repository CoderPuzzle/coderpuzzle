# Solutions — Find the Number of K-Even Arrays

One rewrite collapses the pair condition to a parity statement — after
that only the counts of even and odd values matter.

## Ending-parity pair counting

Rewrite `(arr[i] * arr[i+1]) - arr[i] - arr[i+1]` as
`(arr[i]-1) * (arr[i+1]-1) - 1`, which is even exactly when both neighbors
are even. So a k-even array has exactly `k` adjacent pairs whose two
elements are both even, and a length-`n` array over `[1, m]` offers
`E = ⌊m/2⌋` even values and `O = m − E` odd ones, identical up to their
count. Let `endEven[j]` / `endOdd[j]` be the number of length-`i` arrays
with exactly `j` even-even pairs ending in an even / odd value, seeded at
length 1 with `E` and `O` at `j = 0`. Appending an even value (`E`
choices) moves an even-ending `j−1` state to `j` pairs and leaves
odd-ending states' counts unchanged; appending an odd value (`O` choices)
never creates a pair.

Each extension sweeps `j` once, and values stay below `2 × 10⁹ + 14`
before a multiply by at most 500 (≈10¹², inside 64-bit and inside 2⁵³ for
JavaScript's doubles). The answer is `endEven[k] + endOdd[k]` after `n − 1`
extensions.

**Complexity:** `O(n²)` time, `O(n)` space.
