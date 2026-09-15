# Solutions — Complete Prime Number

## Slice scan with trial division

The definition is checked literally. The decimal digits of `num` are peeled
off into a small array so every prefix and suffix can be read back as an
integer, then each slice is tested for primality by trial division: reject
everything below 2, clear 2 and 3 outright, dismiss multiples of both, and
walk candidate divisors stepping `5, 7, 11, 13, ...` — the alternating
+2/+2 rhythm of the 6k ± 1 wheel — stopping once the divisor's square
passes the value.

The scans short-circuit on the first failure, but the order of the checks
does not matter to the answer: primality of a slice depends only on its own
digits, so the prefix and suffix questions are independent and any single
composite slice forces false. A useful consequence of the wheel is that
every prime above 3 ends in 1, 3, 7, or 9 (outside the single-digit
specials), so most inputs die within the first couple of slices without
ever reaching a long division run. With at most ten digits there are at
most eighteen slices, and each trial division costs at most about 31623 / 3
steps, so the whole verdict costs at most a few hundred thousand modulo
operations even in the worst shape.

**Complexity:** `O(d · sqrt(num))` time, `O(d)` space, where `d` is the
digit count of `num` (at most 10).
