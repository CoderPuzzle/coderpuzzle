# Solutions — Build Array from Permutation

The target array is the input permutation applied twice: `ans[i]` follows
`nums[i]` into `nums` one more time. Because a zero-based permutation only
contains values that are themselves valid indices, that nested lookup is
always in range and nothing can go wrong — the work is pure indexing.

## Direct double indexing

Walk `nums` once and emit `nums[nums[i]]` for every position, writing into a
fresh output array. The fresh array is what makes the pass correct: hint 2's
warning is that rewriting `nums` in place would poison later lookups, since
an overwritten value may still be needed as an index by another position.
Reading only from the untouched input sidesteps the aliasing entirely.

On `[0,2,1,5,3,4]` the pass reads index `nums[0]=0`, then `nums[2]=1`, then
`nums[1]=2`, and so on, producing `[0,1,2,4,5,3]`. With `n <= 1000` there is
nothing to tune; the follow-up's `O(1)`-extra-space variant exists (the
classic quotient/remainder packing trick) but buys nothing at this size and
is not worth the obscurity.

**Complexity:** `O(n)` time, `O(n)` space (the output; `O(1)` beyond it).
