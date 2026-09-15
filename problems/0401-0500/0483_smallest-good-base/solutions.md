# Solutions — Smallest Good Base

## Longest representation first, binary search per length

All digits 1 in base k means n is the geometric series `1 + k + k^2 + ... + k^m` — m + 1 ones — and conversely every pair (k, m) with k >= 2 that makes the series sum to n is an all-ones representation. The search is therefore over lengths m: k >= 2 forces `2^(m+1) - 1 <= n`, so with n at most 10¹⁸ the length never passes 59 and there are barely 60 lengths to test.

Longer representations carry smaller bases, which sets the scan order. The total n is fixed, so more terms force every term down: if lengths m1 > m2 both admitted bases k1 >= k2, the m1-term sum would contain every term of the m2-term sum plus strictly more positive terms and could not also equal n. Hence k1 < k2, and the first length scanned from the top that admits an integer base already carries the smallest one. Length 1 always admits a base — `n = 1 + (n - 1)`, the two-1s representation "11" — so it is the guaranteed answer every n falls back to, as in the third example.

For one length the sum rises strictly with k, so the base is found by search: grow a power-of-two bound past n, then bisect down to the smallest k whose sum reaches n; that k is the hit exactly when the sum equals n. Each evaluation is capped at "already past n": a new term is compared against n / k _before_ the multiply, so no stored value ever exceeds 2n <= 2 * 10¹⁸, comfortably inside the 64-bit integers the fixed-width languages carry. Python's integers are unbounded, and JavaScript and TypeScript use BigInt for the same reason — 10¹⁸ sits far past the 2⁵³ point where a JS number stops representing integers exactly.

**Complexity:** `O(log² n)` time, `O(1)` space.
