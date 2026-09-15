# Solutions — Minimum Operations to Halve Array Sum

## Greedy halving with a max-heap

Each operation removes `x / 2` from the total, where `x` is the element you pick, so to reach a fixed reduction target in the fewest operations you should always spend an operation on the element whose halving removes the most sum — the current maximum. An exchange argument confirms the greedy: any optimal schedule that halves a non-maximum element can swap that operation for a halving of the then-current maximum without decreasing the reduction achieved at every step. Python's `heapq` is a min-heap, so the code stores negated float values to simulate a max-heap.

Instead of re-summing the array each step, the code tracks the remaining required reduction: it initializes `target = total / 2` and subtracts the halved amount from `target` on every operation, stopping once `target <= 0`. The halved value is pushed back because it may still be the maximum and can be halved again in later operations. Working in floating point is exact here — dividing by 2 only decrements a binary float's exponent — so no rounding error accumulates across the repeated halvings.

The operation count is bounded: at any moment during the loop the remaining sum is still at least `total / 2` (the process stops the instant it would dip below), so the current maximum is at least `total / (2n)`, and every operation reduces `target` by at least half of that, i.e. `total / (4n)`. Reaching a total reduction of `total / 2` therefore takes at most `2n` operations, giving `n` heapify work plus `O(n)` pops and pushes at `O(log n)` each. Elements are all positive, so `target > 0` initially and at least one operation always runs.

**Complexity:** `O(n log n)` time, `O(n)` space.
