# Solutions — Two Furthest Houses With Different Colors

## Compare against both endpoints

An optimal pair must include at least one endpoint: if neither endpoint is used, extending the pair toward the left or right endpoint can only increase its distance, and at least one such endpoint differs in color from the opposite member. Thus one candidate is the farthest house from index `0` with a different color.

The other candidate is the farthest house from index `n - 1` with a different color. A single scan compares every house with both endpoint colors and keeps the larger of its distance from the left endpoint and its distance from the right endpoint whenever the colors differ.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
