# Solutions — Find the Peaks

## One scan over interior indices

The first and last positions are excluded by definition, so only the
interior indices `1..n-2` can ever qualify, and the peak condition is a
pure local test: `mountain[i]` must beat both neighbours strictly. One
left-to-right pass checks exactly that pair of comparisons per index and
collects the survivors, which also emits the peaks in ascending index
order.

Strictness does all the discriminative work. An element equal to a
neighbour — a plateau edge like `mountain = [2,4,4]` — fails the test even
though it is as high as everything around it, and a valley between two
larger elements never qualifies because it is smaller on both sides. That
is the whole problem: `n <= 100`, so anything fancier buys nothing.

**Complexity:** `O(n)` time, `O(1)` extra space.
