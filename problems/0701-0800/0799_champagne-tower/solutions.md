# Solutions — Champagne Tower

The question names one glass, but champagne reaches it only through the
glasses above, and the tower's rule is local: a glass holds one cup, and
anything it receives beyond that splits equally between the two glasses
directly below it. Liquid never flows up or sideways, so the whole pour can
be replayed one row at a time down to `query_row` — and nothing below that
row can matter.

## Row-by-Row Simulation

Keep a single array `row`, where `row[j]` is the total champagne that glass
`j` of the current row has received — not how much it holds. The array
starts as `[poured]`. A glass holds one cup, so an entry above `1.0`
overflows by `row[j] - 1.0`, and each of the two glasses below receives
exactly half of that excess. The next row is one glass longer and starts at
zero; one left-to-right pass over the parents adds each positive
`excess / 2` into both children, so every child accumulates its left
parent's share first and its right parent's share second. After
`query_row` such passes the queried glass has received
`row[query_glass]` cups in total, of which it keeps at most one: the
answer is `min(1.0, row[query_glass])`.

The judge compares the returned double exactly, and the arithmetic is
built so every language produces the same bits. Each step is one
subtraction, one division by `2.0` — a power-of-two scaling that rounds
nothing — and additions into the children in one fixed order. There is no
multiplication anywhere for a compiler to fold into a fused multiply-add,
and IEEE-754 additions performed in the same order round identically in
every language.

Only the first `query_row` rows are ever built — call that count `R`, at
most 99 — and each row is one longer than the last. Small pours behave
correctly by construction: a `poured` below `1.0` never produces a
positive excess, so every deeper row stays the all-zero array, and the
dried-out corners of a huge pour (the outermost columns stop overflowing
long before row 99) fall out of the same rule with no special cases. The
final `min` is what reports a full glass as exactly `1.0`, whether it
received one cup or a hundred million.

**Complexity:** `O(R²)` time, `O(R)` space.
