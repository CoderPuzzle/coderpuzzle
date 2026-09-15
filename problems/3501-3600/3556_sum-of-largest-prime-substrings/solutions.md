# Solutions — Sum of Largest Prime Substrings

## Enumerate and Test Prime Substrings

A length-10 string has at most 55 substrings, so the candidate set is tiny:
every substring is parsed to its integer value — leading zeros disappear in
the parse, which is exactly the note's rule — and the values go into a hash
set. Deduplicating on the parsed value rather than the substring text also
implements the "counted only once" rule, since `05` and `5` collapse to the
same number and `"111"` yields just 1 and 11.

The candidates are then visited from the largest down, primality-tested by
trial division against odd divisors up to `sqrt(v)` (hint 2), and the first
three primes found are summed (hint 3). Sorting descending before testing
lets the walk stop after the third prime — the remaining, smaller candidates
are never examined — while "fewer than three" falls out as running off the
end of the list and returning whatever accumulated. Trial division costs
`O(sqrt(v))` per candidate; `v < 10^10` since `s` has at most 10 digits, so
each test is at most ~`5 · 10^4` divisions across ≤ 55 candidates, and the
answer, at most three values below `10^10`, needs 64-bit arithmetic
(sum ≤ `3 · 10^10`, and `f * f ≤ v ≤ 10^10` in the loop itself; both are far
below 2^53, so JavaScript's `Number` stays exact).

**Complexity:** `O(L² + C · sqrt(M))` time, `O(C)` space — with `L ≤ 10`
the string length, `C ≤ L(L+1)/2` distinct candidates, and `M < 10^10` the
largest candidate value.
