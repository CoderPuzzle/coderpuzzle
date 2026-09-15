# Solutions — Mice and Cheese

## Greedy top-k difference swaps

Grant every cheese to the second mouse first — that baseline is simply
`sum(reward2)`. Handing cheese `i` to the first mouse instead changes the
total by exactly `reward1[i] - reward2[i]`, independently of every other
cheese, and exactly `k` cheeses must change hands. Picking which k indices
to flip therefore reduces to adding the k largest elements of the difference
array; sorting it descending makes the selection a prefix scan. There is no
interaction between swaps to worry about: each index contributes its own
delta, so the greedy order is optimal by an exchange argument (swapping any
chosen-but-smaller delta for an unchosen larger one only increases the sum).

Gains can be negative when `k` exceeds the number of cheeses the first mouse
actually wins, and the prefix still takes them — the constraint is "exactly
k", not "at most". Magnitudes stay small: at worst `n = 10⁵` rewards of
`10³` cap the total at `10⁸`, inside 32-bit range, with JS doubles exact far
below their 2⁵³ limit.

**Complexity:** `O(n log n)` time, `O(n)` space.
