# Solutions — Determine the Minimum Sum of a k-avoiding Array

## Take the smaller side of every k-pair, then climb from k

Only values below k can ever violate the condition: two distinct positive
values summing to k must both lie in [1, k-1], and those split into the
disjoint complementary pairs {1, k-1}, {2, k-2}, ... plus the standalone
midpoint k/2 when k is even (which cannot conflict with anything, since it
cannot pair with itself). A valid array therefore keeps at most one element
per complementary pair — at most m = floor(k/2) elements below k in total,
one from each pair plus possibly the midpoint — while every value >= k is
unconstrained, because its would-be partner k - x is nonpositive.

To minimize the sum, take the smaller side 1, 2, ..., m of each pair first,
then fill the remaining n - m slots with the cheapest unconstrained run
k, k+1, k+2, .... No valid array can do better pointwise once sorted: for
the i <= m smallest elements, i distinct positives force a_i >= i by step
growth alone, and for i > m at most m elements precede it below k while the
other i - 1 - m predecessors are distinct values in [k, a_i - 1], forcing
a_i >= k + i - 1 - m. Both bounds are met exactly by this construction, so
the minimum sum is the closed form 1 + 2 + ... + m + (n - m) terms of an
arithmetic run starting at k, computed directly as triangular numbers.
With n, k <= 50 every term stays under 2500 and the whole sum under 2000,
comfortably inside a signed 32-bit integer.

**Complexity:** `O(1)` time, `O(1)` space.
