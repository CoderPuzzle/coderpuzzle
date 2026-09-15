# Solutions — Smallest Range I

Every element travels at most `k`, so the score is decided entirely by the
two ends of the array: the maximum can come down by no more than `k`, the
minimum can rise by no more than `k`, and every other element can always be
tucked between whatever the ends become. One scan for the extremes therefore
answers the question outright — no shifting needs to be simulated.

## Shrink the span by `2k`

The operation can never push the score below `max(nums) - k - (min(nums) + k)`:
whatever shifts are applied, the largest element still ends up at least at
`max(nums) - k` and the smallest at most at `min(nums) + k`, and a score of
zero is the absolute floor. The bound is also attainable — every element
whose value already lies inside the window `[min(nums) + k, max(nums) - k]`
stays put, an element below the window rises by exactly the distance to it
(at most `k`, since it is at least `min(nums)`), and an element above it
descends symmetrically. So the answer is the span `max(nums) - min(nums)`
shrunk by `2k`, clamped at zero.

When the window inverts — the span is at most `2k` — every element can reach
a single common point and the score collapses to 0, which is Example 3's
story: `[1,3,6]` with `k = 3` gathers onto `4`. Example 2 is the surviving
remainder: the span 10 loses `2 * 2 = 4` and keeps a score of 6, while a
one-element array such as Example 1 has a span of 0 to begin with.

Values live in `0..10⁴` and `k` is at most `10⁴`, so the span, `2k`, and
their difference all stay far inside the native 32-bit integers the
signature already uses — no wider intermediates are needed in any language.

**Complexity:** `O(n)` time, `O(1)` space.
