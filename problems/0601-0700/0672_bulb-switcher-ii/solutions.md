# Solutions — Bulb Switcher II

## Six classes, eight outcomes

Each button flips a set of labels that is periodic — all, the evens, the
odds, and the `3k + 1` positions, with periods 1, 2, 2 and 3 — so whatever
the presses, the final status string repeats with period 6. Write `A1..A4`
for the parities of the four press counts; a bulb ends up flipped by the xor
of the buttons touching its label, so the six class statuses are
`s1 = A1 xor A3 xor A4`, `s2 = A1 xor A2`, `s3 = A1 xor A3`, then
`s4 = s1 xor s2 xor s3` while `s5 = s3` and `s6 = s2`. The whole string is
therefore pinned by bulbs `1..min(n, 3)`: `n = 1` counts the values of `s1`
alone, `n = 2` the `(s1, s2)` pairs, `n >= 3` the full triples.

Which parity vectors can exactly `p` presses realize? Pressing a button
twice cancels, so only the parities matter, and a vector with `k` odd
entries needs those `k` presses at minimum while any leftover presses are
doubled away on one button: realizable iff `k <= p` and `k` shares `p`'s
parity. Counting distinct strings over the realizable vectors gives the
answer. At `p = 0` only the initial all-on string survives. `n = 1` sees
both values of `s1` from `p = 1` on. `n = 2` gets 3 at `p = 1` — buttons 3
and 4 coincide there, each flipping only bulb 1, which is exactly Example
2's three statuses — and all four pairs from `p = 2`. For `n >= 3` the
counts are 4, 7, 8 at `p = 1, 2, 3+`; the one string `p = 2` misses is
`(off, on, on)`, whose only parity preimages use 1 and 4 odd entries.

Eight is the ceiling, for two reasons that multiply: only sixteen parity
vectors exist, and pressing buttons 1, 2 and 3 together is the identity —
flip all, flip evens, flip odds touches every bulb exactly twice — so the
sixteen parities pair up two per string and at most eight strings are
possible at all. From `p = 3` both parity classes attain all eight, and
the answer just stays there; the code is the resulting table, one branch
per row.

**Complexity:** `O(1)` time, `O(1)` space.
