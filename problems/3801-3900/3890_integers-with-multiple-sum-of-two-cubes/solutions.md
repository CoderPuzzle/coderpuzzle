# Solutions — Integers With Multiple Sum of Two Cubes

## Count every cube-sum in a map

With `n <= 10⁹`, the largest possible base is `1000`, since `1000³ = 10⁹`
already equals the bound. So the number of pairs `(a, b)` with `a <= b` and
`a³ + b³ <= n` is small — a little under half a million. Enumerating every
pair, computing its cube-sum, and tallying how many distinct pairs produce
each sum is therefore fast enough to do directly.

Precomputing `i³` for `i` from `1` up to the integer cube root of `n` avoids
recomputing powers. Two nested loops walk `a` from `1` upward and `b` from
`a` upward; the inner loop breaks as soon as `a³ + b³` exceeds `n`, since
`b` only grows from there. Each sum is recorded in a hash map from sum to
the number of distinct pairs that form it.

A value is good exactly when its count reaches two. Collecting every map key
with count at least two and sorting the result ascending yields the answer;
the sort is necessary because the map has no useful order.

**Complexity:** `O(L²)` time, `O(L²)` space, where `L = ⌊∛n⌋ ≤ 1000`.
