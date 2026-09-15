# Solutions — Check if it is Possible to Split Array

## Adjacent-pair characterization

A piece of length one is good by definition, and any piece of length two can
always be cut into two singletons, so arrays with `n <= 2` are trivially
splittable regardless of `m`. For `n >= 3` the answer is true exactly when
some adjacent pair sums to at least `m`. Necessity comes from the _last_ cut
of any finishing sequence: when every piece has finally become a singleton,
the final cut must have split a two-element piece into its two elements (a
longer last victim would leave a non-singleton behind), and that piece had to
be good when an earlier cut produced it — meaning those two neighbors alone
already summed to at least `m`.

Sufficiency is constructive. Fix a qualifying adjacent pair and keep it glued
together: while the current piece is longer than the pair, split off the end
element farthest from the pair. The lone element peeled off is good, and the
remainder still spans the whole pair, so its sum is at least the pair's sum,
which reaches `m`. The piece shrinks element by element until only the pair
remains; it too splits into two singletons, and every single cut in between
was legal. That is exactly `n - 1` cuts, so both directions coincide and a
single scan settles the question.

The implementation needs no prefix sums or tables: test `n <= 2`, then check
whether any neighboring sum reaches `m`. Pair sums are bounded by
`100 + 100 = 200`, comfortably inside 32-bit integers and JS numbers alike.

**Complexity:** `O(n)` time, `O(1)` space.
