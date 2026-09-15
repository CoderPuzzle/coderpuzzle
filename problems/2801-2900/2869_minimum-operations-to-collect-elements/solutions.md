# Solutions — Minimum Operations to Collect Elements

## Reverse Suffix Scan

Operations only ever remove the current last element, so after `t`
operations the collection is exactly the suffix of `nums` of length `t`,
and the question reduces to the shortest suffix that contains every value
`1, 2, ..., k`. Elements larger than `k` can never contribute, and a value
seen once never needs to be seen again, so each suffix boundary only has
to know which of the `k` wanted values have already appeared behind it.

Scan `nums` once from the end, keeping a boolean occurrence array of size
`k + 1` and a counter of distinct wanted values seen so far. Each element
in `1..k` that is not yet marked gets marked and increments the counter;
the first position where the counter reaches `k` is the tail of the
minimal suffix, so the answer is `nums.length - i` at that moment, and
unwanted or duplicate elements cost nothing but the visit itself. The
constraints guarantee the wanted values are all present, so the counter
always reaches `k` at or before the front of the array. With
`nums.length <= 50` the answer is at most 50, far inside a signed 32-bit
integer in every language.

**Complexity:** `O(n)` time, `O(k)` space.
