# Solutions — Find First and Last Position of Element in Sorted Array

## Two bisections

A sorted array answers "where" questions by bisection, and the statement's `O(log n)` requirement rules out any scan. The run of targets has two observable boundaries: the first index holding a value `>= target` is where the run starts, and the first index holding a value `>= target + 1` sits one slot past where it ends — the classic lower bound and upper bound. Because the array never decreases, everything between those two indices must equal `target`, so the pair of boundaries is the answer.

Both boundaries come from a single helper. It bisects the half-open window `[0, len(nums))`, keeping whichever half must contain the smallest index whose value reaches `limit`, until the window is that one index. `searchRange` calls it first with `limit = target`; if the result is past the end or the value there is not `target`, no run exists and `[-1, -1]` comes back — checking the value in place is what makes absence cheap, with no second confirming scan. Otherwise the second call passes `target + 1`, since the upper bound of `target` is exactly the lower bound of `target + 1`, and subtracting 1 yields the run's last index.

The same two calls cover every shape of input. An empty array falls out through the length check; a target below, above, or between the values fails the equality check, whether the neighbors are distinct or equal runs themselves; a single occurrence makes the two bounds adjacent and the answer `[i, i]`; when every element equals `target` the second bound is `len(nums)` and the answer is `[0, len(nums) - 1]`. C++, Java, and Rust widen the limit to 64 bits because `target + 1` can be one past the 32-bit maximum; the remaining languages have the headroom natively.

**Complexity:** `O(log n)` time — two bisections — and `O(1)` space.
