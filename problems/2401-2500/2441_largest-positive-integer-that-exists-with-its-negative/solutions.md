# Solutions — Largest Positive Integer That Exists With Its Negative

## Hash Set of Signed Values

A positive `k` qualifies exactly when `-k` also appears somewhere in `nums`,
so the whole problem reduces to membership tests: which of the values seen
so far can be looked up in constant time. One pass builds a set from every
element; a second pass walks the array and keeps the largest positive value
whose negation is in that set. The constraints promise no zeros, so a value
can never serve as its own partner, and any positive candidate's negation
is guaranteed nonzero too.

The scan starts `best` at `-1`, the required answer when nothing pairs.
Because the second loop only ever raises `best` to a qualifying positive
value, duplicates cost nothing extra — `[7, 7, -7]` sets `best = 7` on
either copy of `7`. Values are bounded by `[-1000, 1000]`, so everything
fits 32-bit integers in every language, and the answer itself lies in
`[-1, 1000]`.

**Complexity:** `O(n)` time, `O(n)` space for the set.
