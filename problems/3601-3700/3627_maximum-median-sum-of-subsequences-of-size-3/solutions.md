# Solutions — Maximum Median Sum of Subsequences of Size 3

## Sort descending and pair the top two against the bottom one

Sorting the values descending reveals the exchange structure of an
optimal play. In any triple the median is its middle value, so the
largest element overall can never be a median — it would need an even
larger element in its own triple, and none exists. The best use of that
doomed maximum is as payment for deleting the smallest remaining value:
group the two largest values with one smallest value, keep the second
largest as the median, and nothing smaller is ever wasted on a triple
that could have carried a bigger middle. An exchange argument makes this
formal — swapping any chosen triple for this shape never decreases the
median sum — so the greedy is optimal, matching the hint's "pick the
largest 2 values and the minimum value".

After sorting descending (`s[0] >= s[1] >= ...`), step `t` consumes the
two largest remaining values `s[2t]`, `s[2t + 1]` and the `t`-th smallest
value `s[n - 1 - t]`, so the medians are exactly the values at the odd
indices `1, 3, 5, ...` — the first `n / 3` of them. The answer is their
sum, which reaches roughly `(n/3) × 10⁹ ≈ 1.7 × 10¹⁴`: far past 32-bit
range, but below 2⁵³, so 64-bit integers (or exact JS numbers) carry it
safely.

**Complexity:** `O(n log n)` time, `O(1)` extra space (beyond the sort).
