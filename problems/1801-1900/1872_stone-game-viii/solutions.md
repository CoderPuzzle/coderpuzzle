# Solutions — Stone Game VIII

Simulating the game state by state explodes: each turn may take any
prefix of length greater than one, and the row itself changes as merges
happen. The key structural observation is that the row after any number
of moves is always `[prefix[j], stones[j], ...]` for some frontier index
`j` — the single merged stone on the left always equals the prefix sum,
so the whole game is just a walk over frontiers `2..n`.

## Running-maximum game DP

Let `f(j)` be the best score-difference contribution of the player to
move when the frontier sits at `j`. A move jumps from frontier `j` to
some `k` in `(j, n]`; because the previously merged stone is consumed
too, the mover's gain is exactly `prefix[k]`, and the opponent then
holds `f(k)`. Hence `f(j) = max_{k>j} (prefix[k] - f(k))`, which differs
from `f(j+1)`'s recurrence only by one new candidate. Scanning `j` from
`n-1` down to 2 while maintaining the running maximum
`S = max_{k>j} (prefix[k] - f(k))` evaluates every state in O(1); Alice's
answer is the value of `S` after all candidates with `k >= 2` are folded
in.

The scan needs only the prefix sums and one integer. Values stay within
64 bits since `|prefix| <= n * max|stones[i]| <= 10^9` and the running
maximum never exceeds twice the total absolute sum.

**Complexity:** `O(n)` time, `O(1)` space.
