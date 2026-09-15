# Solutions — Distinct Numbers in Each Subarray

Consecutive windows share `k - 1` elements, so recomputing any window
from scratch wastes nearly all its work. A frequency map that slides one
step at a time turns each transition into one insertion and one removal,
and the distinct count follows from how many values currently hold a
nonzero frequency.

## Sliding frequency map

Build the first window's frequencies while tracking `distinct`, the
number of values with nonzero count. Each later step adds `nums[i]` —
raising `distinct` when its count was zero — and drops `nums[i - k]` —
lowering `distinct` when its count falls to zero. After each step the
current `distinct` is exactly the answer for the window ending at `i`.
Deleting keys at zero keeps the map proportional to the window content.

Each element triggers a constant number of hash operations.

**Complexity:** `O(n)` time, `O(k)` space.
