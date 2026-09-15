# Solutions — Number of Ways to Reach a Position After Exactly k Steps

## Binomial coefficient over the step split

Only the distance `d = |endPos - startPos|` matters — the number line's
absolute coordinates are irrelevant. If the walk takes `r` right steps and
`l` left steps, the net displacement is `r - l = d` with `r + l = k`, which
forces `(k - d)` to be even, `d <= k`, and fixes
`right = (k + d) / 2`. Every ordering of those steps is a distinct way, so
the answer is simply `C(k, right)` modulo 10⁹ + 7; any violated condition
makes it 0.

Precompute factorials up to `k` (at most 1000) plus inverse factorials via
Fermat's little theorem, so each query is one multiplication.

**Complexity:** `O(k)` time, `O(k)` space.
