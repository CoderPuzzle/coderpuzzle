# Solutions — Find Indices With Index and Value Difference I

The answer is a witness, not a count: the first index pair that clears
both thresholds can be handed back as-is, and only when the whole pair
space is exhausted does `[-1, -1]` become the answer. With `n` at most
100, checking pairs directly is the intended shape of the problem.

## Exhaustive pair scan

Two nested loops walk every ordered pair `(i, j)` — the order `i` before
`j` matters only for which valid pair is reported first, since the
conditions are symmetric under swapping the two indices. Each pair is
tested with the two inequalities exactly as stated, and the first pair
that satisfies both is returned immediately.

The `[-1, -1]` sentinel is returned only after both loops finish without
a hit, which is precisely the case where no ordered pair clears both
thresholds. The two thresholds are independent — the index condition
depends on `i` and `j` alone, the value condition on `nums[i]` and
`nums[j]` alone — so the combined test is just their conjunction, and
`i = j` pairs are tested too, which is what lets
`indexDifference = valueDifference = 0` answer `[0, 0]` on any input.
Every pair costs constant work, and the scan keeps no state beyond the
loop counters.

**Complexity:** `O(n²)` time, `O(1)` space.
