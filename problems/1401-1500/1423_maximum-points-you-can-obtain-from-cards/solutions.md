# Solutions — Maximum Points You Can Obtain from Cards

## Sliding window on the complement

Taking exactly `k` cards from the two ends always leaves behind one contiguous middle block: if `x` cards come from the left and `k - x` from the right, the untouched cards are exactly `cardPoints[x .. n - k + x - 1]`, a window of fixed length `n - k`. So the achievable scores are `total - (sum of some window of length n - k)`, and maximizing the score is the same as minimizing the sum of that window — the order in which the end cards are taken is irrelevant, only the split point matters.

The minimum is found with a classic fixed-size sliding window. Compute the sum of the first `n - k` cards, then slide the window one position at a time across the array: each move adds the entering card `cardPoints[i]` and drops the leaving card `cardPoints[i - window]`, keeping the running sum in O(1) and tracking its minimum. The answer is `total - best` over all `n - k + 1` placements.

Why the complement view wins over direct DP over `(left taken, right taken)` — an `O(k^2)` table for large `k` — is that the window sum compresses the whole state space to a single dimension: every split `x` corresponds to exactly one window position.

![The seven cards with the kept middle window of n − k = 4 and the k = 3 cards taken off the ends.](figures/solution-card-window.svg)

Edge cases: `k == n` makes the window length 0, every slide degenerates to adding `cardPoints[i] - cardPoints[i] = 0`, and the whole array's total is returned; `k == 0` is excluded by the constraints. Only a few scalars are used beyond the input.

**Complexity:** `O(n)` time, `O(1)` space.
