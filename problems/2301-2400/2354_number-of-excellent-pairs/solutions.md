# Solutions — Number of Excellent Pairs

## Bit-Count Bucketing over Distinct Values

The pivotal identity is that for any two numbers, `popcount(num1 OR num2) + popcount(num1 AND num2) = popcount(num1) + popcount(num2)`: every bit set in either number appears in exactly one of the OR or the AND (bits set in both land in the AND, bits set in just one land in the OR), and no bit is counted twice or missed. So the pair condition depends only on the individual popcounts of the two numbers, not on how their bits overlap.

That reduces the problem to counting pairs from a multiset of bit-counts. Deduplicate `nums` first — pairs are counted over distinct values, with `(a, b)` and `(b, a)` both counted and `(a, a)` allowed once the value exists — and bucket the distinct values by their number of set bits, giving `counts[b]` for each bit count `b`. Since values fit in 30 bits, there are at most 30 non-empty buckets; iterating every ordered pair of buckets and adding `c1 * c2` whenever `b1 + b2 >= k` counts every ordered value pair exactly once.

Because `k <= 60` while two 30-bit numbers can supply at most 60 bits combined, large `k` simply yields zero when no bucket pair qualifies — no special casing needed. The deduplication via `set(nums)` also means duplicates in the input contribute nothing extra, matching the "distinct pairs" definition. Edge cases like a single repeated value collapse to one bucket and one candidate pair `(v, v)`.

**Complexity:** `O(n + B²)` time with `B <= 30` distinct bit counts (so effectively `O(n)`), `O(B)` extra space beyond the `O(n)` dedup set.
