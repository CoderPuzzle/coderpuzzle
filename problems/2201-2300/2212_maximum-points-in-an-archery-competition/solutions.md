# Solutions — Maximum Points in an Archery Competition

Bob's only real decision is which sections to win: beating Alice on section `k`
costs exactly `aliceArrows[k] + 1` arrows — anything more is wasted, anything
less loses the section — and pays `k` points. With twelve sections the whole
decision space is 4096 subsets, so enumeration beats any cleverer packing
argument.

## Sweep every subset of sections

The code walks the 4096 bitmasks, where bit `k` means Bob wins section `k`,
accumulating each subset's arrow cost and point total. A subset is feasible
when its cost fits inside `numArrows`; among feasible subsets the sweep keeps
the one with the most points, upgrading only on a strictly better score. Since
section 0 pays nothing, the winning subset never needs it, and every arrow left
over after buying the winning sections is parked on section 0 — the sum of
`bobArrows` stays equal to `numArrows` for free.

Strictly-better upgrades make the sweep deterministic: when several subsets tie
for the maximum, the first (smallest) mask reached is the one kept, so the
returned allocation is a fixed, reproducible choice among the equally scoring
answers the statement permits. Costs are bounded by `numArrows + 12`, far below
any fixed-width limit, and the sweep itself is two nested loops of constant
bounds, independent of `numArrows`.

**Complexity:** `O(2¹² · 12)` time, `O(1)` space.
