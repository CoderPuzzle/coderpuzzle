# Solutions — Patching Array

## Greedy coverage doubling

The key idea is to track `reachable`, the smallest positive sum that cannot yet be formed; by invariant, every sum in `[1, reachable)` is already achievable using a subset of the elements consumed so far. The answer only needs coverage up to `n`, so the algorithm loops while `reachable <= n` and does one of two things per iteration.

If the next unused element `nums[i]` is `<= reachable`, consuming it costs no patch and extends coverage to `[1, reachable + nums[i])`: any target `t` in the new gap satisfies `t - nums[i]` in `[0, reachable)`, which is either 0 (the empty sum) or already formable. Otherwise there is a genuine gap at `reachable` — no existing element can bridge it — and the algorithm patches `reachable` itself, doubling the covered range to `[1, 2 * reachable)`. Patching exactly the missing value is optimal: any patch `x < reachable` covers strictly less new ground, and a larger patch leaves `reachable` itself uncovered, so a greedy exchange argument shows this choice never hurts later coverage.

Each loop iteration either advances the pointer into `nums` (which can happen at most `len(nums)` times) or performs a patch, and every patch doubles `reachable`, so at most about `log2(n)` patches occur even when `nums` is exhausted. This keeps the loop short despite `n` being as large as `2^31 - 1`. The loop exits as soon as `reachable > n`, so no unnecessary patches are counted; an input such as `[1, 2, 2]` with `n = 5` correctly returns 0.

**Complexity:** `O(len(nums) + log n)` time, `O(1)` space.
