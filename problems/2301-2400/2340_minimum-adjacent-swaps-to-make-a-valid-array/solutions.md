# Solutions — Minimum Adjacent Swaps to Make a Valid Array

## Position arithmetic on the chosen extremes

Each adjacent swap moves one element one position, so bringing a particular
element from index `p` to an end costs exactly its distance there: `p` swaps
to reach the front, `n - 1 - p` to reach the back. The cheapest valid
outcome therefore uses the leftmost smallest element and the rightmost
largest element — any other choice of which min or max to promote can only
add distance. One scan records `i`, the first index of the minimum, and
`j`, the last index of the maximum.

If the minimum sits left of the maximum (`i < j`), the two journeys never
share a position and the answer is simply `i + (n - 1 - j)`. When the
maximum comes first (`j < i`), the two elements must cross each other, and
the single swap that passes them by one another advances both journeys at
once — every other swap moves only one of them. That shared swap is counted
once in both distances above, so the total overcounts by exactly one and
the answer is `i + (n - 1 - j) - 1`. A single-element array is already
valid and returns 0 through the same arithmetic, since `i == j == 0` and
the extremes coincide.

**Complexity:** `O(n)` time, `O(1)` space.
