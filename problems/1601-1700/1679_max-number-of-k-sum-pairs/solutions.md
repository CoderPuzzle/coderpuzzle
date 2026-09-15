# Solutions — Max Number of K-Sum Pairs

Every operation removes one `x` and one `k - x` together, so the order of
the array and the positions of its elements are irrelevant — the answer is
settled entirely by how often each value occurs. Collapsing the array into
a frequency table makes each value's pairing capacity a single lookup
against its complement's.

## Complement-counting frequency map

A number `x` can only ever be removed alongside `k - x`, and every such
removal consumes one of each, so the two distinct values can form exactly
`min(count(x), count(k - x))` pairs — the scarcer side runs out first and
whatever remains is stranded. Totaling over each unordered value pair,
visiting a value only while `x < k - x` so that `{x, k - x}` is counted
once, sums the operations across all complements at once.

The one value that pairs with itself needs its own rule: when `k` is
even, `x = k / 2` is its own complement and two copies of it form an
operation, contributing `count(x) / 2` pairs with one element left over
whenever the count is odd. On the example `nums = [3,1,3,4,3]`,
`k = 6` the three 3s self-pair once (`k / 2 = 3`), while the 1 and the 4
wait for a 5 and a 2 that never appear — one operation in total, exactly
the trace the statement walks through.

Values and `k` both reach `10^9`, so two of them sum to
`2 * 10^9` — past the 32-bit range — yet the comparison never adds two
values: `k - x` stays inside `[-10^9, 10^9]`, and `x < k - x` decides
every branch. The answer is at most `n / 2 <= 5 * 10^4`, comfortably
narrow. One pass builds the frequency map and a second over its distinct
keys totals the pairs.

**Complexity:** `O(n)` time, `O(n)` space.
