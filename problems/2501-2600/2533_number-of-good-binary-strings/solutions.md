# Solutions — Number of Good Binary Strings

Any good string decomposes uniquely into runs of equal characters, and each
run's size must be a positive multiple of its character's group. So peel off
the final run: what precedes it is either nothing or a shorter good string
ending in the opposite character — but the shorter string itself doesn't
need to remember its ending, because the peeled run already fixes the pair.

## Linear block recurrence

Let `dp[i]` be the number of good strings of length exactly `i`, with
`dp[0] = 1` for the empty string. A length-`i` good string is obtained from a
good string of length `i − oneGroup` by appending a block of 1's, or from one
of length `i − zeroGroup` by appending a block of 0's, and every good string
arises exactly once this way (its final run has one fixed size multiple, and
recursion peels the rest). The answer sums `dp[i]` for the whole window,
everything reduced modulo 10⁹ + 7. Intermediate values never exceed twice
the modulus, so they are exact even in double-precision floats; compiled
languages keep them in 64-bit integers.

One pass over lengths up to `maxLength` with constant work each dominates
the runtime; memory is the single dp array. At the constraint ceiling of
10⁵ this stays far inside the limits.

**Complexity:** `O(maxLength)` time, `O(maxLength)` space.
