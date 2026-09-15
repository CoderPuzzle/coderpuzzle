# Solutions — Minimum Jumps to Reach End via Prime Teleportation

Adjacent steps always connect the whole array, so a breadth-first search
over indices finds the minimum jump count; the only question is making
teleportation edges cheap.

## BFS with clear-once prime buckets

A sieve of Eratosthenes up to `max(nums)` decides primality, and a
value → indices table records where every value occurs. When an index
whose value is a prime `p` is settled for the first time, all indices it
could teleport to are exactly the entries of `bucket[p]` — every index
whose value is a multiple of `p` — so they are all enqueued at distance
`d + 1` and the bucket is cleared after that single use. The clearing is
safe because BFS settles indices in nondecreasing distance: any later
prime-`p` index is at distance `≥ d`, so replaying the bucket could only
offer distances `≥ d + 1`, which its members already have. Each index is
enqueued once, and each bucket is materialized at most once by walking
the multiples `p, 2p, 3p, …` of `p` through the value table, so the
total teleport work is `Σ max(nums)/p` over the distinct prime values
that actually occur — well under `3×10⁶` for `nums[i] ≤ 10⁶`.

Values of 1 (never prime) and arrays with no prime at all degrade to the
plain adjacent-step walk, giving `n - 1` steps, and a single-element
array answers 0 without touching the sieve.

**Complexity:** `O(max(nums) · log log max(nums) + n + Σ max(nums)/p)`
time, `O(max(nums) + n)` space.
