# Solutions — Find the Derangement of an Array

## The two-term derangement recurrence

Let `D(n)` count the derangements of `1..n` and ask where element 1 lands: any
of the `n - 1` positions other than its own, say position `i`. Two disjoint
cases close the count. Either `i`'s element lands in position 1 — the pair is
mutually settled and the remaining `n - 2` elements must derange among
themselves, `D(n - 2)` ways — or `i`'s element goes elsewhere, in which case
position 1 becomes its forbidden home and the remaining `n - 1` elements form
a fresh derangement, `D(n - 1)` ways. Hence
`D(n) = (n - 1) * (D(n - 1) + D(n - 2))` with `D(1) = 0` and `D(2) = 1`; the
examples fall out as `D(2) = 1` and `D(3) = 2 * (1 + 0) = 2`.

Only the last two values are ever read, so two rolling variables climb from
`(D(1), D(2))` up to `n`, reducing modulo `10^9 + 7` after every step: both
running values sit below the modulus, but their sum times `i - 1` reaches
about `2 * 10^15` at the `10^6` ceiling — far beyond 32 bits, exactly held by
64-bit registers and by doubles (which are exact below `2^53`), with Python
ints exact throughout. The raw count first exceeds the modulus already at
`n = 13` (!13 = 2290792932), so the per-step reduction carries real weight
from the sweep's start, not just at its ceiling.

**Complexity:** `O(n)` time, `O(1)` space.
