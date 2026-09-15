# Solutions — Jump Game

## Greedy Farthest Reach

Instead of exploring which paths through the array are possible, the solution tracks a single number: `farthest`, the largest index reachable using any sequence of jumps among the positions visited so far. An index `i` is standable exactly when `i <= farthest`, because reachability grows continuously — if you can stand on some index `j <= i` you can also stand on every index below `j`. So the whole exponential search space collapses into one running maximum.

The loop walks the array once. At each index it first checks standability: if `index > farthest`, a gap has opened that no jump can cross, so the last index is unreachable and the answer is `false` immediately. Otherwise the reach is extended to `index + nums[index]` when that beats the current maximum, and if the reach ever covers the last index the answer is `true` on the spot — no need to keep scanning.

![Arcs for nums = [2,3,1,1,4]: index 0 reaches to 2, index 1 reaches to 4, so farthest already covers the last index after two steps.](figures/solution-reach-arcs.svg)

The early `false` check must come before the update; a zero at an unreachable index (`nums = [3,2,1,0,4]`, index 3 with reach stuck at 3) is what produces the `false` verdict once the index counter passes the reach. The early `true` exit also covers the trivial single-element input: index 0 with `farthest = 0` already satisfies `farthest >= last`, returning `true` without examining any jump. If the scan finishes without either trigger, the last index was reached, and the trailing `return true` covers it.

Only two scalar variables are maintained regardless of input size, and each element is examined exactly once.

**Complexity:** `O(n)` time, `O(1)` space.
