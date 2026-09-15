# Solutions — Maximum Linear Stock Score

## Group by constant price-minus-day offset

The linearity identity compares only consecutive picks, but it unrolls into
one shared constant: `prices[indexes[j]] - prices[indexes[j - 1]] ==
indexes[j] - indexes[j - 1]` rearranges to `prices[indexes[j]] -
indexes[j] == prices[indexes[j - 1]] - indexes[j - 1]`, so walking down the
selection telescopes every pick to the same value of `prices[i] - i`. The
converse holds too — if every picked day shares one offset `d`, both sides
of the identity equal `d` for each consecutive pair, so the selection is
linear. Valid selections are therefore exactly the subsets of a single
`prices[i] - i` group, and since every price is at least 1, the best subset
of a group is the whole group: adding a day never lowers the score.

So one sweep decides it: accumulate `sum(prices)` per group keyed by
`prices[i] - i` (with `i` counted from 1) in a hash map, then return the
largest group total. A group total reaches `10⁵ · 10⁹ = 10¹⁴`, far past the
32-bit ceiling — hence the 64-bit return in every typed language — while
`10¹⁴ < 2⁵³` keeps JavaScript's `Number` exact along the way.

**Complexity:** `O(n)` time, `O(n)` space.
