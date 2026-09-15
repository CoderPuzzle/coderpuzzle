# Solutions — Put Marbles in Bags

## Sorting Adjacent-Pair Sums

Every bag holds a contiguous block of marbles and costs `weights[i] + weights[j]` for its endpoints, so a distribution into `k` bags is a choice of where the array is cut. The full-array endpoints always contribute `weights[0] + weights[n-1]` regardless of the distribution — every distribution's score includes the first and last elements exactly once — so they cancel in the max-minus-min difference. What distinguishes one distribution from another is only the `k - 1` internal cut points: cutting between positions `i` and `i + 1` adds `weights[i] + weights[i + 1]` to the score, because those two elements become the right endpoint of one bag and the left endpoint of the next.

So the maximum score is the base endpoints plus the `k - 1` _largest_ adjacent-pair sums, and the minimum score is the base plus the `k - 1` _smallest_. Their difference — the answer — is simply the sum of the top `k - 1` pair sums minus the sum of the bottom `k - 1`, computed after sorting all `n - 1` adjacent-pair sums once.

The `k == 1` early return is not an optimization but a correctness guard: with one bag there are no cuts, and the general formula's slices (`adj[-0:]` would grab the whole list) do not describe that case — the difference is 0. For `k = n` every adjacent pair is a cut and both slices coincide, again yielding 0. Weights up to 10^9 make the pair sums and their differences reach into the trillions, which Python's native integers absorb without any overflow concerns.

**Complexity:** `O(n log n)` time, `O(n)` space.
