# Solutions — Global and Local Inversions

## The prefix max two steps back

A local inversion is an adjacent descent, and an adjacent pair is also a
pair of the global kind — every local inversion is counted by the global
definition too. So the global count can never be smaller, and the two are
equal exactly when every global inversion is a local one: when no pair
`(k, i)` with `k <= i - 2` has `nums[k] > nums[i]` anywhere in the array.

That reformulation turns the count comparison into a single scan. Walk left
to right carrying `prefixMax`, the maximum of `nums[0..i-2]` — the elements
far enough back that a descent across them would be global but not local.
It starts at 0, harmless over the empty prefix since every value is at
least 0. At each `i`, if `nums[i] < prefixMax`, some element two or more
positions back outranks `nums[i]` and the answer is immediately false;
otherwise `nums[i-1]` graduates into the prefix and the max absorbs it. A
full pass with no such find certifies that every inversion is adjacent, so
the counts coincide and the answer is true. `[1,0,2]` survives — the lone
descent is the swap itself — while `[1,2,0]` dies at `i = 2`: the `0` sits
below the prefix max `1`, the extra inversion the local count never sees.

On a permutation, surviving the scan pins every value within one of its
home index — `nums[i]` is `i - 1`, `i`, or `i + 1` — which is where the
hint's question about placing 0 and 1 points: the ideal permutations are
exactly the identity cut into disjoint adjacent transpositions. One
comparison and one register per element, no second array: at `n = 10⁵`
the scan is a few hundred thousand steps, far inside the limits.

**Complexity:** `O(n)` time, `O(1)` space.
