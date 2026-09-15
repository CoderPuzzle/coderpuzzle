# Solutions — Number of Digit One

## Per-Digit-Place Counting

Counting the 1s in `0..n` directly is far too slow; instead count, for each decimal place independently, how many numbers in the range have a `1` at that place, and sum over the places. For a place with weight `factor` (1, 10, 100, …), split `n` into three parts: `higher` = the digits above the place, `current` = the digit at the place, and `lower` = the digits below it. Each of these three quantities is a couple of divisions and a modulo away.

The contribution of the place falls out of a cycle argument. Writing numbers in order, the digit at a given place cycles through 0–9 with period `10 * factor`, and each full cycle dedicates `factor` positions to the digit 1 — hence the `higher * factor` base term counting complete cycles. The current digit decides the partial cycle: if it is 0, the partial cycle never reaches 1 and only the base term counts; if it is exactly 1, the partial cycle contributes `lower + 1` additional ones (all values of the lower digits, plus the zero case); if it is 2 or more, the entire block of `factor` ones is covered, adding a full extra `factor` (the `(higher + 1) * factor` form).

The loop multiplies `factor` by 10 while it stays at most `n`, so it runs once per digit of `n`, and `n <= 0` is dispatched up front by returning 0. In Python the arithmetic cannot overflow, but the `factor * 10` in the `higher` computation is the spot where fixed-width languages need a wider type. Every step is O(1) arithmetic on integers that fit in a machine word for `n` up to 10⁹.

**Complexity:** `O(log n)` time, `O(1)` space.
