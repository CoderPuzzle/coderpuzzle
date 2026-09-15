# Solutions — Semi-Ordered Permutation

## Position arithmetic on the two extreme values

Each adjacent swap moves one element one position, so bringing the value 1
from index `i` to the front costs exactly `i` swaps and bringing the value n
from index `j` to the back costs exactly `n - 1 - j`: every swap shifts its
target by at most one step, and bubbling each value straight toward its end
achieves those counts. One scan records both positions.

The journeys interact only when they cross. If `i < j`, marching 1 leftward
never touches anything right of it, and marching n rightward never touches
anything left of `j`, so the two totals simply add. If `i > j`, the values
must pass each other, and the one swap where they sit adjacent as `[...,
n, 1, ...]` advances both journeys simultaneously — it is counted once in
each distance above but performed only once, so exactly one swap is shared
and the answer is `i + (n - 1 - j) - 1`.

**Complexity:** `O(n)` time, `O(1)` space.
