# Solutions — Maximize Sum of Squares of Digits

## Greedy nines from the left

Concentrating digit mass is what maximizes the score. Any two nonzero digits
a and b with a + b at most 9 are strictly better merged, since a² + b² is
less than (a + b)² whenever both are positive; when a + b exceeds 9, moving
one unit from the smaller digit onto the larger one never lowers the score.
Repeating those moves drains the digits down to nines plus at most one
leftover, so the optimal multiset is forced: floor(sum / 9) nines, the
remainder r = sum mod 9 when it is positive, and zeros everywhere else.

The same observation doubles as the construction, and it settles feasibility
first: if sum > 9 * num, even nine in every position falls short of the
required digit sum and no good integer exists. Otherwise write floor(sum / 9)
nines from the left, append r when positive, and pad with zeros up to num
digits. Because sum >= 1, the leading position always receives a nine or r,
never a zero, so the string is a genuine num-digit integer; and laying this
fixed multiset out in descending order yields the largest of all maximum-score
integers, which resolves the statement's tie-break by construction.

The arithmetic never leaves comfortable 32-bit territory — 9 * num is at
most 1.8 * 10⁶ and the quotient below 2.3 * 10⁵ — so the answer string is
the only large object the method builds.

**Complexity:** `O(num)` time, `O(num)` space.
