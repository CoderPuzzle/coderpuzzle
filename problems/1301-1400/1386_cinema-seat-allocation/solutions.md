# Solutions — Cinema Seat Allocation

## Approach: Per-row bitmask over touched rows only

A row without any reservation always fits the left block (seats 2–5) and the
right block (seats 6–9) — two groups — so only rows appearing in
`reservedSeats` need real work, and there are at most `10⁴` of them. Pack
each such row into a 10-bit mask of reserved seats. Both blocks fit together
exactly when the mask is disjoint from seats 2–5 and from seats 6–9 (bits 1–4
and 5–8); otherwise one group fits when either the middle block (seats 4–7,
bits 3–6) is free or one side is; otherwise none. Rows never reserved
contribute `2 * (n - touched)`.

**Complexity:** `O(r)` time for `r = reservedSeats.length` to build the masks
and score each touched row in constant time, `O(t)` space for the `t`
distinct touched rows.
