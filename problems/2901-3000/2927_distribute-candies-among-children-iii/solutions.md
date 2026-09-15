# Solutions — Distribute Candies Among Children III

Distributions of n identical candies to 3 distinct children without any
cap are the stars-and-bars count C(n + 2, 2). The cap is what the
inclusion-exclusion principle is for: count everything, remove the
distributions where some child exceeds the cap, put back the ones where
two do, and the triple overlap never actually arises.

## Inclusion-exclusion on the cap

Without the cap there are C(n + 2, 2) distributions. A child breaks the
cap in exactly the distributions where it holds limit + 1 or more
candies — hand that child limit + 1 candies up front and distribute the
remaining n - (limit + 1) freely, giving C(n - (limit + 1) + 2, 2)
violating distributions per child, so subtract 3 times that. Two named
children both breaking the cap were subtracted twice, so add back
C(3, 2) · C(n - 2 · (limit + 1) + 2, 2). The three-child overlap needs
n ≥ 3 · (limit + 1) — but that already means n > 3 · limit, more
candies than the three children can hold in total, so the true count is
zero there and an early return disposes of the triple term (and of every
answer of zero) in one comparison. A binomial term with a negative top
counts as 0, which is what makes the loop's early break correct.

Every term is a couple of multiplications on integers; the largest value
involved is the uncounted C(n + 2, 2) ≤ (10⁸ + 2)(10⁸ + 1)/2 ≈
5·10¹⁵, so 64-bit accumulators carry it. JavaScript Numbers are exact
below 2⁵³ ≈ 9·10¹⁵: the early return keeps every live term below
3 · (2n/3)²/2 < 7·10¹⁵, and each binomial halves its even factor before
multiplying, since the raw product (rest + 2)(rest + 1) itself reaches
10¹⁶.

**Complexity:** `O(1)` time, `O(1)` space.
