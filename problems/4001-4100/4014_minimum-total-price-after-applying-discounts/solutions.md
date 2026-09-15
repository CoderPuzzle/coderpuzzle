# Solutions — Minimum Total Price After Applying Discounts

## Sort both ways and pair positionally

Applying discount `d` to price `p` pays out `(p * (100 - d)) / 100`, so compared to leaving the item alone it saves exactly `p * d / 100`. The undiscounted sum of `prices` is fixed, which turns the problem into pure maximization: choose a matching of items to discounts (each side used at most once) whose total saving `Σ p * d / 100` is as large as possible. Every real pair has a positive weight, so the best matching always uses `min(n, m)` pairs.

The exchange argument settles which matching: if `a >= b` are two prices paired against discounts `c < d`, pairing them same-way instead of crossed changes the saving by `(a - b)(d - c) >= 0`. So for any chosen sets of prices and discounts, sorting both descending and pairing index-wise is optimal — and taking the largest prices with the largest discounts beats any other subset, position by position. The answer is therefore the full price total minus `p[i] * d[i] / 100` over the descending-sorted arrays for the first `min(n, m)` positions.

Each product fits comfortably in 32 bits, but the sum of up to 10⁵ products reaches 10¹², so the savings accumulate in a 64-bit integer and the single division by 100 happens once at the end. The returned double is then the correctly rounded value of the exact rational total, safely inside the 10⁻⁵ tolerance regardless of input order.

**Complexity:** `O(n log n)` time, `O(1)` space.
