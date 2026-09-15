# Solutions — Maximize Alternating Sum Using Swaps

## Union-find components + greedy top-E placement

A pair can be replayed any number of times, and chains of swaps compose:
whatever values enter a connected component of the swap graph can be
permuted among its indices at will, while nothing crosses a component
boundary. So a disjoint-set union over the index pairs partitions the
array into independently rearrangeable groups, and the problem collapses
to choosing the best arrangement inside each group separately.

Inside one component the choice is binary per value: it lands on an even
slot (added) or an odd slot (subtracted), and only `E` even slots exist.
Moving value `v` from an odd slot to an even slot changes that component's
contribution by `+2v`, so the best assignment puts the `E` largest values
on the even slots. If `sumTopE` is their sum and `sumAll` the sum of every
value in the component, the contribution is `sumTopE - (sumAll - sumTopE)
= 2 * sumTopE - sumAll` — sorting the component's values descending and
splitting after the first `E` evaluates it directly. Summing this term
over all components is the answer; totals reach about `10^14` at the given
bounds, so fixed-width languages must accumulate in 64-bit integers.

**Complexity:** `O(n log n + m α(n))` time, `O(n)` space.
