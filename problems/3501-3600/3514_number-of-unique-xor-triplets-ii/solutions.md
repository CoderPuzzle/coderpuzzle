# Solutions — Number of Unique XOR Triplets II

## Pairwise-XOR set, then spread

The ordering `i <= j <= k` only decides which indices a triplet may pick;
XOR of the three values does not care about their order. So the reachable
value set is exactly every `nums[i] ^ nums[j] ^ nums[k]` with the three
indices chosen freely, repeats included — and every such value factors as
`(nums[i] ^ nums[j]) ^ nums[k]`: a pairwise XOR spread by one more element.

The solution collects all pairwise XORs into a set, then spreads that set by
every element, marking `pair ^ value` for each combination; the answer is the
size of the marked set. Equal elements contribute `0` to the pair set, which
is how triplets like `a ^ a ^ b = b` (every single element) stay reachable,
and the example's `{1, 3}` — with no way to build `1 ^ 3 = 2` from three
elements — falls out naturally.

The factorization is what keeps this far below the `O(n³)` triple loop:
every element is below `1500 < 2¹¹`, so the pair set holds at most `2048`
distinct values no matter how large `n` grows. Collecting it costs `O(n²)`
scans, and the spread costs at most `2048 · n` set insertions, which is the
term that dominates once the pair set saturates.

**Complexity:** `O(n²)` time, `O(2¹¹)` space.
