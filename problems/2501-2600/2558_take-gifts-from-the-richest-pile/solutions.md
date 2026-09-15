# Solutions — Take Gifts From the Richest Pile

## Max-Heap Simulation

The process is a straight simulation, and `floor(sqrt(v))` only ever
shrinks a pile of size ≥ 1, so the only question is doing it cheaply.
Fetching the current maximum dominates: a max-heap answers it — and takes
the replacement value back — in logarithmic time. Build the heap once,
then run exactly k rounds of pop, push its integer square root. Ties are
a non-issue despite the statement's "choose any": replacing either copy
of a shared maximum leaves the same multiset of pile sizes, so every
choice order converges to the same total.

Square roots must be exact floors, never float approximations: each
language seeds the guess from a double sqrt and then corrects it with
integer squares (`r·r > v` / `(r+1)² ≤ v`). For values up to 10⁹ the true
root is at most 31622, so those probe squares stay near 10⁹ — exact even
as JavaScript Numbers (limit 2⁵³).

The returned total needs care with widths rather than algorithms:
initial gifts can sum to 10³ · 10⁹ = 10¹², beyond 32-bit range, so the
accumulators are 64-bit integers everywhere (`long`, `int64`,
`Number`-safe by the same 2⁵³ argument).

**Complexity:** `O(n + k log n)` time, `O(n)` space.
