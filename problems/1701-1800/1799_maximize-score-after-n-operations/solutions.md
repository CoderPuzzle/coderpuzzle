# Solutions — Maximize Score After N Operations

## Bitmask DP over removal states

Track a bitmask of the elements already consumed: `dp[mask]` is the best
score achievable once exactly the elements in `mask` have been removed.
Half the mask's popcount is the number of operations spent, so the state
also fixes the next multiplier — the upcoming operation is
`popcount(mask) / 2 + 1`, and it scores that multiplier times the gcd of
the two elements chosen. Precompute the gcd of every index pair once
(`2n <= 14` means at most 91 pairs), then sweep the masks in ascending
order: transitions only set bits, so every mask is final before anyone
reads it, and the answer sits at `dp` of the full mask.

Each transition pairs any two still-present elements — deliberately not
just pairs containing, say, the lowest free index. The multiplier grows
with the operation count, so the richest pair usually belongs to the last
operation rather than the first, and only a transition free to pick any
two survivors can defer it that far. Scores stay at most `28 x 10⁶`
(seven multipliers summing to 28 against gcds capped by `10⁶`), so 32-bit
integers hold every total — and plain JS numbers, exact below `2⁵³`, are
nowhere near the edge.

**Complexity:** `O(4ⁿ x n²)` time, `O(4ⁿ)` space, for an array of `2n`
elements (at most `16384` states, each trying at most 49 pair choices).
