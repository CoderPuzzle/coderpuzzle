# Solutions — Smallest Greater Multiple Made of Two Digits

## Generate every candidate, then scan in sorted order

The set of integers that can possibly be the answer is tiny. A number
that uses only the digits `digit1` and `digit2`, never starts with `0`,
has at most 10 decimal digits — an 11-digit value is at least `10¹⁰`,
which already exceeds the signed 32-bit limit `2³¹ - 1 = 2147483647`.
With two digits available the count is bounded by
`2 + 4 + ... + 2¹⁰ = 2046` numbers, so the whole candidate space fits
easily in memory.

Generation proceeds by length: seed the work list with the nonzero
digits (a leading zero would silently shorten the number, and `0` is
never larger than `k ≥ 1`), then at each level append every allowed
digit to every current number to produce the next length. Collecting
the levels for lengths `1` through `10` yields every candidate, because
the `k` constraint (`1 ≤ k ≤ 1000`) means `0` can never qualify.

Once all candidates are in one sorted list, the answer is simply the
first value that is strictly greater than `k` and divisible by `k`.
If the scan exhausts the list — either because no value qualifies at
all, or because the first qualifying value would exceed `2³¹ - 1` —
the problem defines the result as `-1`. The sorted order makes the
"smallest" requirement automatic and lets the scan stop at the first
hit.

Fixed-width languages build the candidates in 64-bit arithmetic
(values reach `10¹⁰`) and cast back to a 32-bit `int` only for the
returned answer, which the problem guarantees stays at or below
`2³¹ - 1`.

**Complexity:** `O(2¹⁰ log 2¹⁰)` time and `O(2¹⁰)` space — effectively
constant under the given constraints.
