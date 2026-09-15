# Solutions — Minimum Operations to Exceed Threshold Value II

## Min-heap simulation

Every operation is forced to consume the two smallest values currently in the array, so there is no scheduling decision to make — the process is fully deterministic once the array is in a min-heap. Heapify the input once, then repeatedly pop the two smallest `x <= y`, push `x * 2 + y` back, and count one operation.

The loop condition checks the heap's minimum: if it is at least `k`, every element is, so the process stops; it also stops once fewer than two elements remain. Each merge shrinks the array by one, so at most `n - 1` operations ever run, and since the combined value `x * 2 + y` strictly exceeds `y` (values are at least 1), progress toward the threshold is guaranteed — the constraints additionally promise an answer exists.

Note the pushed value is exactly the problem's formula `min(x, y) * 2 + max(x, y)`: the first pop is the smaller element by heap order.

**Complexity:** `O(n log n)` time, `O(n)` space.
