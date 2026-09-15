# Solutions — Maximal Score After Applying K Operations

## Greedy max-heap simulation

Because `ceil(v / 3)` only ever shrinks a positive value, the element you
decline to take now stays at least as large later while the winner of this
round becomes smaller or equal. Exchanging any chosen operation order for
one that always takes the current global maximum therefore never loses:
the greedy rule hinted by the statement holds, and the whole problem
reduces to repeatedly fetching "the largest number alive", consuming it,
and feeding back its replacement `(v + 2) / 3` — integer arithmetic on a
non-negative value makes the ceiling exact.

A binary max-heap serves both directions of that loop in `O(log n)` per
operation. Build it once in `O(n)`, then run `k` rounds of top → add →
replace, for `O((n + k) log n)` overall and no recursion anywhere — every
language's heap here is iterative, including the hand-rolled array-backed
one used where the runtime ships none. Sizes stay tame even at the caps
(`n`, `k ≤ 10⁵`): the score's true upper bound is `k · 10⁹ = 10¹⁴`.

That bound doubles as the precision proof: `10¹⁴` sits far below both
signed 64-bit range (`≈ 9.2·10¹⁸`, required by the wire) and JavaScript's
exact-Number limit `2⁵³ ≈ 9.0·10¹⁵`, so plain numbers are exact there too.
Heap contents never exceed `10⁹`.

**Complexity:** `O(n + k log n)` time, `O(n)` space.
