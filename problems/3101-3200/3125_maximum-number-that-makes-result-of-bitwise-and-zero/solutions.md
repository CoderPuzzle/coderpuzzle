# Solutions — Maximum Number That Makes Result of Bitwise AND Zero

## Highest power of two minus one

Take m to be the index of the highest set bit of n, so 2^m <= n < 2^(m+1).
Any candidate x above 2^m - 1 satisfies x >= 2^m, which pins every number
in the range [x, n] inside [2^m, 2^(m+1)) — all of them carry bit m, so the
bitwise AND of the range keeps bit m set and can never be zero. Lowering x
all the way down to exactly `2^m - 1` changes that in one stroke: the range
now contains both `2^m - 1` (low bits all ones) and `2^m` (a lone high bit),
and those two AND to zero, taking the whole range's AND with them. So the
answer is always the power of two at or below n, minus one — for n = 7 the
highest power of two is 4 and the answer is 3; for n = 17 it is 16 and the
answer is 15. For n = 1 the same rule yields 0, which is consistent with
AND[0..1] = 0 being achievable only from below the one-element range.

Finding that power of two takes a simple doubling loop from 1 while the
next doubling would overshoot n — about fifty iterations at n <= 10^15.
Each loop step multiplies an exact value by two, so every intermediate
power of two is exact regardless of language width.

**Complexity:** `O(log n)` time (~50 iterations), `O(1)` space. The result
is below 2^50, so 64-bit integers hold it everywhere and JS `Number`
(proven by `10^15 < 2^53`) stays exact.
