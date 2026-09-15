# Solutions — Number of Burgers with No Waste of Ingredients

## Solve the 2x2 linear system

With `J` jumbo and `S` small burgers the ingredients impose `4J + 2S =
tomatoes` and `J + S = cheese`. Two equations, two unknowns, and the
solution — when it exists — is unique. Doubling the second equation and
subtracting eliminates the small burgers: `2J = tomatoes - 2*cheese`.
That immediately exposes every failure mode: an odd numerator (odd
tomato count), a negative one (too few tomatoes for the cheese on hand),
or a negative back-solved `S = cheese - J` (too many tomatoes for the
cheese). When all three checks pass, `[J, S]` is the answer.

The uniqueness matters: unlike most constructive problems there is no
search here at all — the checks _are_ the algorithm.

**Complexity:** `O(1)` time, `O(1)` space.
