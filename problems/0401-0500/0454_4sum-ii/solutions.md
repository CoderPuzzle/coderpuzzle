# Solutions — 4Sum II

Walking every `(i, j, k, l)` quadruple is `O(n^4)` — at n = 200 that is 1.6
billion combinations. The equation itself suggests something better: four
values total zero exactly when the nums1 pair's sum cancels the nums2 pair's,
`a + b = -(c + d)`. The four arrays split into two independent halves around
that equation, and both solutions below join the halves — one with a sorted
array bracketed by binary searches, the other with a hash map carrying
multiplicities. The split is the shared insight; the join is where they differ.

## Sorted Binary Search

The hash map's job is only to answer, per left sum, "how many right sums
equal its negation?" A sorted array answers the same question, provided the
question is asked differently: bracket the run of equal values with two
binary searches and measure its length. That is this variant's whole plan.
It materialises the `n²` sums `a + b` of the nums1 two arrays into one flat
list and the `n²` sums `c + d` of the last two into another, sorts the
nums2 list, and then for each left sum adds
`upper_bound(right, -(a+b)) - lower_bound(right, -(a+b))` to the tally.

Multiplicities survive by construction — duplicates sit side by side after
the sort as a run whose length the two bounds measure, so example 3's six
quadruples fall out exactly as they do from the map's counters. And the
tally stays exact for the same reason as in the map version: every
quadruple is counted once, through its unique half-split. The trade is
time for machinery: sorting costs `O(n² log n)` and each of the `n²`
lookups pays another `log` factor, against the map's expected-constant
joins — deterministic, ordered behaviour in exchange.

The two lists of `n²` sums dominate storage; at n = 200 that is 40,000
entries each, and the running total can reach `n⁴ = 1.6 × 10⁹`, which is
why the tally widens to 64 bits in several ports.

**Complexity:** `O(n² log n)` time, `O(n²)` space for the pair-sum lists.

## Meet in the Middle

Enumerating all `(i, j, k, l)` tuples is `O(n^4)` — hopeless even at n = 200 (1.6 billion combinations). The split trick is to observe that the equation `a + b + c + d = 0` can be cut in half: it holds exactly when `a + b = -(c + d)`. The four arrays form two independent pairs, so counts of pair sums can be joined through a hash map.

First the code builds `sums`, a map from each value `a + b` (over all n^2 index pairs from the first two arrays) to the number of pairs producing it. Then it walks the n^2 pairs of the last two arrays and, for each `c + d`, adds `sums[-(c + d)]` — the number of ways the first half could have summed to exactly the negation. Every zero-sum tuple is counted once through its unique `(i, j)` and `(k, l)` split, so the total is exact, and duplicates in the arrays cause no trouble because the map stores multiplicities rather than a set of sums.

Both loops are plain double iterations with O(1) average hash operations, turning quartic work into quadratic. With n up to 200 that is 40,000 map insertions and 40,000 lookups, and sums fit comfortably in machine integers since values are bounded by 2^28.

**Complexity:** `O(n^2)` time, `O(n^2)` space for the pair-sum map.
