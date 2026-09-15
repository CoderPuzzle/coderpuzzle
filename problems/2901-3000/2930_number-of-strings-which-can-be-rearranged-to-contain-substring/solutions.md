# Solutions — Number of Strings Which Can Be Rearranged to Contain Substring

Whether a string can be rearranged to contain "leet" depends only on its
character counts: a multiset admits some arrangement with the consecutive
block `l, e, e, t` exactly when it holds at least one l, one t, and two
e's. Counting multisets-of-multisets over 26 letters directly is awkward,
so flip to the complement and subtract.

## Inclusion-exclusion over the deficits

Start from all 26ⁿ strings and subtract the ones missing a requirement:
no l, no t, or fewer than two e's. Strings with no l have 25 choices per
position, so 25ⁿ of them; likewise 25ⁿ have no t. Having at most one e
splits into zero e's (25ⁿ strings) plus exactly one e — n positions times
25^(n−1) for the rest — giving 25ⁿ + n·25^(n−1). Intersections shrink the
alphabet the same way (no l and no t leaves 24ⁿ; combining a missing
letter with the at-most-one-e deficit adds the analogous n·24^(n−1)
correction), and all three deficits together give
23ⁿ + n·23^(n−1). The alternating sum
26ⁿ − 3·25ⁿ − n·25^(n−1) + 3·24ⁿ + 2n·24^(n−1) − 23ⁿ − n·23^(n−1) is the
answer, computed modulo 10⁹ + 7 with fast exponentiation, so n up to 10⁵
costs only ~17 squarings per power.

Every reduced power stays below 10⁹ + 7, and the signed combination of the
seven terms stays under 2.1 × 10¹⁴ — inside 64-bit accumulators and below
2⁵³, which is why JavaScript's numbers remain exact throughout (the
squarings themselves, whose products reach ~10¹⁸, go through BigInt).

**Complexity:** `O(log n)` time, `O(1)` space.
