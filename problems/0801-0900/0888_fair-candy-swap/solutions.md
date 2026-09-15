# Solutions — Fair Candy Swap

One box from each side changes hands, so the whole problem lives in a single equation: whichever pair the friends trade, the rest of the candies stay put.

## One equation and a hash set

A swap of Alice's box `a` for Bob's box `b` equalizes the totals exactly when `sumA - a + b == sumB - b + a`, which rearranges to `b == a - (sumA - sumB) / 2`. The halved difference of the totals — call it `delta` — is one number shared by every candidate, so each of Alice's boxes names exactly one Bob box that could partner it, and the search collapses from comparing every pair to one membership test per box.

The set of Bob's box sizes answers that test in constant time: one pass builds it, a second pass over Alice's boxes computes `a - delta` and keeps the smallest pair whose partner is present — smallest Alice box first, then smallest Bob box, which is the statement's pin. Totals reach `10⁴ × 10⁵ = 10⁹` candies, so the sums and `delta` live in 64-bit arithmetic even though every box size fits in 32 bits; a candidate `a - delta` names a real box precisely when the set contains it.

For `[1, 2]` and `[2, 3]` the totals are 3 and 5, so `delta = -1`: box 1 asks for 2, box 2 asks for 3, both are present, and the pin takes `[1, 2]`. Duplicates need no special handling — the set records each size once, and two boxes of the same size name the same partner. A scan that finds nothing would mean no fair swap exists, which the statement rules out.

**Complexity:** `O(n + m)` time, `O(m)` space.
