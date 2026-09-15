# Closest Divisors

## Approach: Scan down from the square root of each candidate

For a fixed product m, the divisor pair closest together is the one whose
smaller factor is largest — the first divisor met when walking DOWN from
⌊√m⌋. So each of num + 1 and num + 2 is resolved by one downward scan
from its integer square root, and the better pair (smaller gap) wins; a
perfect square ends its scan immediately with the tightest possible gap, 0.

The canonical answer is emitted with the smaller factor first — the
statement accepts either order. Each scan is at most √(num + 2) ≈ 31623
iterations.

**Complexity:** O(√num) time, O(1) space.
