# Solutions — Grumpy Bookstore Owner

## Sliding window over the grumpy minutes

First sum the customers in every minute where the owner is already not
grumpy — that baseline is satisfied no matter what. Then slide a window
of length `minutes` across the array, tracking the extra customers that
would be saved by suppressing grumpiness inside that window (only
minutes where `grumpy[i] == 1` contribute, since minutes that are
already calm add nothing extra). Grow the window by adding the entering
minute's contribution when it is grumpy, shrink it by removing the
leaving minute's contribution when it is grumpy, and keep the best
window total seen. The answer is the baseline plus that best extra.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
