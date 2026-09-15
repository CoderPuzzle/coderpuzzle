# Solutions — Maximum Frequency After Subarray Operation

Choosing the shift `x` is choosing a source value `v = k - x`: inside the
selected subarray, exactly the elements already equal to `v` land on `k`
after the addition. Elements equal to `k` inside the window land
elsewhere — destroyed. So the one operation asks, for some `v`, for the
window maximizing (captures of `v`) − (destructions of `k`), on top of
the `k`s the window leaves untouched.

## Fix the source value, then Kadane

For a fixed `v ≠ k`, score each element `+1` if it equals `v`, `-1` if
it equals `k`, and `0` otherwise — the best window for that `v` is the
maximum-subarray sum of this score array, which Kadane's running sum
finds in one pass, resetting to zero whenever the sum dips negative.
Resetting encodes the right to be picky: a prefix that loses more `k`s
than it captures is always worth dropping. The answer is the baseline
count of `k` plus the best window score over all `v`, never below the
baseline itself — choosing `x = 0` changes nothing, so an empty
improvement (score 0) is always available. `v = k` needs no pass of its
own since it can only realize that zero.

Values live in `1..50`, so there are at most 49 passes over an array of
length `n` — `O(50·n)` time, comfortably within limits, and the only
state is a handful of counters (`O(1)` extra space). Every count is
bounded by `n ≤ 10⁵`, so 32-bit arithmetic is exact in every language
and JavaScript's doubles hold the integers precisely.

**Complexity:** `O(50·n)` time, `O(1)` space.
