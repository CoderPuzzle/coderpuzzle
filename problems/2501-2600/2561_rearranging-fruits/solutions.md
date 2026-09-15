# Solutions — Rearranging Fruits

## Parity-guarded ticket pool with minimum-element relay

Feasibility falls straight out of a frequency audit. A cost value can only
end up equally split between the baskets if its combined count across both
is even — the final common multiset holds the same number of copies on each
side, and every swap moves whole fruits without ever splitting one. Any odd
combined count therefore answers -1 immediately; otherwise each basket's
overflow is even per value, and `|diff(v)| / 2` copies of `v` must emigrate
out of whichever basket overholds them.

The cost accounting rides on one structural fact: every swap exchanges one
export ticket for one import, so relocations consume tickets two at a time.
Pool all tickets together and sort them ascending — only the cheapest half
of the pool ever needs to move to an expensive home; the expensive half
rides along as free return cargo inside those same swaps. Prices cap at
twice the global minimum fruit cost `m`: rather than paying a costly ticket
directly, shuttle `m` out of position and back again (two swaps) and the
same imbalance clears for a flat `2 * m`. Each of the cheapest-half tickets
thus costs exactly `min(ticket, 2 * m)`, summed after one sort.

Bounds stay comfortable: at most `n` paying tickets capped at twice a cost
below `10⁹`, so the answer never exceeds `2 · 10¹⁴` — beyond 32-bit range,
hence the 64-bit accumulators in Java, C++, Go and Rust, yet far below
JavaScript's exact-Number limit `2⁵³`.

**Complexity:** `O(n log n)` time, `O(n)` space.
