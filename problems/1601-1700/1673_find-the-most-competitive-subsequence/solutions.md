# Solutions — Find the Most Competitive Subsequence

## Monotonic Stack

"Most competitive" is plain lexicographic-smallest over length-`k` subsequences, and the classic greedy for that is a monotonic non-decreasing stack. Walk the array once; while the stack top is strictly greater than the incoming value and we can still afford to drop it, pop. An element may be dropped only if enough elements remain in the rest of the input to refill the stack to size `k`, which the guard `len(stack) + (n - i) > k` checks exactly.

After the popping loop, the value is appended only when the stack has room (`len(stack) < k`); once the stack holds `k` elements, later values can only evict through the popping condition, never extend. At the end the stack is exactly the answer of length `k` (which is guaranteed reachable since `k <= n`).

![The example array 3, 5, 2, 6 with k = 2 shown as four stack snapshots: 3 is pushed, 5 is pushed on top, the incoming 2 pops both because two unread values can still refill the slots, and 6 is pushed last, giving the answer 2, 6.](figures/solution-stack-states.svg)

The strict `>` comparison is deliberate: replacing an equal value with a later equal value changes nothing lexicographically, so keeping the earlier occurrence is both correct and what preserves stability with duplicates. Each element is pushed once and popped at most once, so the single pass is linear despite the nested `while`.

**Complexity:** `O(n)` time, `O(k)` space.
