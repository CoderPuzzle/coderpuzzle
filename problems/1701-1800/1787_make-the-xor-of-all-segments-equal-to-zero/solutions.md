# Solutions — Make the XOR of All Segments Equal to Zero

## Periodic classes and an XOR-state DP

Two adjacent segments of size `k` share `k - 1` elements, and both XORs must
end up zero, so cancelling the shared part forces `nums[i] = nums[i+k]`. The
finished array is therefore periodic with period `k`, and every segment of
size `k` carries the same XOR — the XOR of the `k` values that the residue
classes settle on. A class, the positions congruent to some `r` modulo `k`,
pays its size minus the multiplicity of the chosen value inside it, and the
constraint `k <= nums.length` guarantees that all `k` classes are non-empty.

The sweep keeps `dp[x]`, the fewest changes among the classes handled so far
whose chosen values XOR to `x`. Because every value is below `2^10`, `x`
ranges over just 1024 states. Each class offers one option per value it
already contains, at cost `size - count`, which scatters `dp[u] + cost` into
state `u ^ v`; it also offers the option of rewriting every element, which
costs the full class size and leaves the value free, so every state is
reachable at `min(dp) + size`. That fallback is what lets the optimum pick a
value no class contains, and it never understates a cost: an absent value
really does cost the full size, while a present one is charged exactly by its
count option.

After all `k` classes, `dp[0]` is the answer — the fewest changes whose
chosen values XOR to zero. Counts live in a flat 1024-slot table per class,
and the table is filled by a plain index walk, so the whole method is
iterative and uses constant space beyond the two state rows.

**Complexity:** `O((n + k) * 2^10)` time, `O(2^10)` space.
