# Solutions — Count Fancy Numbers in a Range

A number is fancy when its own digits are strictly monotone, or when the sum
of its digits forms a strictly monotone number. Both "good" sets are small: a
strictly monotone integer has at most ten distinct digits, and a digit sum of
a number below 10¹⁵ is at most 144. Counting directly by a single sweep is
therefore replaced by counting three manageable sets and combining them.

## Good sets and a digit-sum DP

First precompute the strictly monotone numbers ("goods"): every nonempty
subset of the digits 1–9, arranged increasingly, gives one strictly
increasing number, and every nonempty subset of 0–9 with a nonzero leading
digit, arranged decreasingly, gives a strictly decreasing number. The union
has about 1500 elements, small enough to sort once and binary-search per
query. The good digit sums are exactly the goods in [1, 144].

Three counts are then combined by inclusion–exclusion. `countSumGood(x)` is a
digit DP over the decimal digits of x: a table `ways[k][t]` holds how many
k-digit tails (leading zeros allowed) sum to exactly t, so at each position a
digit below x's own fixes the prefix forever and the freed tail can be
counted in one step when the running sum plus that tail lands on a good sum.
`countGood(x)` is a binary search over the precomputed goods, and
`countOverlap(x)` counts goods whose digit sum is also good, so the
double-counted numbers can be subtracted. The answer for [l, r] is the three
counts evaluated at r minus the same three evaluated at l - 1.

The digit-sum table has only 145 columns and the goods list only about 1500
entries, so both bounds are handled in about O(log n + 1) digit steps. All
intermediate counts stay below 10¹⁵, within the exact integer range of a JS
`Number`, and comfortably inside 64-bit integers in the typed languages.

**Complexity:** `O(log n)` time, `O(1)` space.
