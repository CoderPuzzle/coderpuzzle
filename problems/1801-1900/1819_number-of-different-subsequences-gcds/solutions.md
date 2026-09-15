# Solutions — Number of Different Subsequences GCDs

## Enumerate candidate GCDs over multiples

Enumerating subsequences is hopeless, so flip the question around: instead of asking what GCDs exist, test each candidate value `g` from 1 up to the maximum element and ask whether some subsequence has GCD exactly `g`. The key monotonicity is that adding elements to a subsequence can only keep the GCD the same or shrink it. Consequently, among all subsequences whose elements are divisible by `g`, the one with the smallest GCD is the subsequence consisting of _every_ array element divisible by `g`. So `g` is achievable if and only if the GCD of all present multiples of `g` is exactly `g` — if it is, that full set is a witness; if it drops below `g`, no other divisible subsequence can climb back up.

The code keeps a set of present values and, for each candidate `g`, walks the multiples `g, 2g, 3g, ...` up to the maximum, folding each present multiple into a running GCD (seeded with 0, since `gcd(0, x) = x`). The loop breaks early the moment the running GCD equals `g` — the GCD can never rise again, so the candidate is confirmed without scanning the remaining multiples. If `g` itself is present, the very first multiple confirms it instantly.

Every achievable GCD is counted exactly once because it is confirmed only at its own iteration. Writing `M` for the maximum element, the inner loops are the classic harmonic sum: the total number of multiples examined is about `M/1 + M/2 + ... + M/M`, which is what makes the approach feasible for values up to 200,000.

**Complexity:** `O(M log M)` time, `O(n)` space.
