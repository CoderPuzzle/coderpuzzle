# Solutions — Minimum Capacity Box

## One pass, keep the smallest fitting capacity

A box is usable exactly when its capacity is at least itemSize. The answer
is the first index of the smallest usable capacity, so a single left-to-right
scan can remember the best capacity seen so far.

Maintain the smallest usable capacity found together with its index. When a
later box fits with a capacity strictly smaller than the current best, update
both; equal capacities are ignored, which is what keeps the earliest index.
If no box ever fits, the answer stays -1.

**Complexity:** `O(n)` time, `O(1)` space.
