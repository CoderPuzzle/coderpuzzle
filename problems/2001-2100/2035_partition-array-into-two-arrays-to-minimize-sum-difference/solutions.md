# Solutions — Partition Array Into Two Arrays to Minimize Sum Difference

## Meet in the Middle

Splitting the `2n` input elements into two equal halves makes the subset sums of each half enumerable: each half of size `n <= 15` has at most `2^n` subsets, and throughout `n` denotes this half-length. The first half's chosen subset (say with sum `a` and `c` elements) will be one side of the partition, and the second half must contribute exactly `n - c` elements with some sum `b`, so the two sides have sizes `c + (n - c) = n` each. The absolute difference is `|total - 2(a + b)|`, so for every `a` the goal is to find a `b` from the matching count class of the second half that brings `a + b` as close as possible to `total / 2`.

To enumerate efficiently, subset sums of each half are bucketed by how many elements produce them — `A[c]` lists all sums of `c`-element subsets of the first half, `B[c]` likewise for the second half — by iterating every bitmask. For each count `c`, the list `B[n - c]` is sorted (once), and for each `a` in `A[c]` a binary search finds the insertion point of the value nearest to `total/2 - a`; the candidate `b` on each side of that point is evaluated and the best absolute difference retained. Working with `2*b >= total - 2*a` keeps everything in exact integers and sidesteps the half-sum being fractional.

Negative values need no special treatment because the search compares sums directly rather than assuming monotone subset structure. The minimum over all counts and all pairs is the answer; the smallest possible difference of 0 is found naturally when the two sides balance exactly.

**Complexity:** `O(n * 2^n)` time, `O(2^n)` space.
