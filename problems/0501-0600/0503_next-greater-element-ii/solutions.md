# Solutions — Next Greater Element II

## Circular Monotonic Stack

Circular search would let an element look past the end of the array and continue from the front, and the standard trick is to simulate that without copying anything: iterate `i` from `0` to `2n - 1` and read the value at `idx = i % n`. One extra lap is always enough, because the element that finally resolves a waiting index lies within one full cycle ahead of it.

Within that doubled scan runs the usual monotonic-stack discipline, but on indices rather than values, since the answer must be written back to the right slot. The stack holds indices whose values form a non-increasing run; whenever `nums[stack[-1]] < nums[idx]`, the circular value `nums[idx]` is the first greater value ahead of every popped index, so `result[stack.pop()] = nums[idx]`. Equal values are not popped — the next greater element must be strictly greater — which also keeps duplicates from answering each other.

New indices are pushed only during the first lap (`i < n`); the second lap exists purely to resolve the indices still waiting, and anything still unresolved keeps the `-1` the result array was initialized with. Each index is pushed at most once and popped at most once across the whole `2n` scan, so the work is linear despite the nested-looking while loop.

**Complexity:** `O(n)` time, `O(n)` space.
