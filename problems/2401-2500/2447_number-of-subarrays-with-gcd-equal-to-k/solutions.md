# Solutions — Number of Subarrays With GCD Equal to K

## Incremental GCD Enumeration

Fix the left endpoint `i` and extend the right endpoint `j` one element
at a time, carrying the gcd of `nums[i..j]` (hint 2). The carried value
is monotone: appending an element can only lower a gcd, never raise it,
so one left-to-right pass per anchor visits every subarray with that left
endpoint exactly once. Whenever the running gcd equals `k`, the subarray
`nums[i..j]` counts, and each qualifying `(i, j)` pair is counted on its
own visit — nothing is missed or double-counted.

The early break is what keeps this fast. A gcd of a prefix can only
shrink, and it shrinks to a divisor of its old value; once `k` no longer
divides the carried gcd, no later gcd — every one of which divides the
current one — can equal `k`, so the inner sweep stops. Each surviving
step at least halves-or-divides the candidate gcd values, bounding the
inner loop by `O(log(max(nums)) )` amortized distinct-gcd transitions per
anchor in practice; the plain bound is `O(n * log V)` gcd steps overall
for `n <= 1000`, comfortably fast.

Values reach `10⁹` but stay inside 32 bits everywhere: gcds of the inputs
never exceed `10⁹` and counts never exceed `n * (n + 1) / 2 = 500500`.

**Complexity:** `O(n * log(max(nums)))` time in the amortized sense, `O(1)` space.
