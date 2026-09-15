# Solutions — Product of Array Except Self

Two arrangements of the same factorization: the product of everything
except `nums[i]` is always (product of everything before `i`) ×
(product of everything after `i`). One variant materializes both helper
arrays explicitly and multiplies them pointwise; the other folds the two
sweeps into the output array and keeps only two running products.

## prefix_arrays

The product of everything except `nums[i]` factors cleanly as (product of all elements before `i`) × (product of all elements after `i`). Both factors are computable with running products, so no division is ever needed — which is essential, since division would break on the zeros the array may contain and is forbidden by the problem anyway.

This variant writes the factorization out in full: `pre[i]` accumulates the products of all left prefixes (`pre[0] = 1`, the empty product, so the first cell's prefix is neutral) and `suf[i]` does the same from the right (`suf[n] = 1`). A final pointwise pass multiplies `pre[i] × suf[i+1]`, the two ranges that together span everything except `nums[i]` itself. Each array is built in its own loop, so the three phases read top to bottom as the formula itself.

Zeros need no special casing: a single zero makes every prefix-then-suffix product zero except at the zero's own index, where the two products multiply the non-zero elements around it, and two or more zeros zero everything — the formula produces all of this automatically. The cost is the extra storage: two auxiliary arrays of `n + 1` products alongside the output.

**Complexity:** `O(n)` time, `O(n)` auxiliary space beyond the output array.

## rolling

The same identity, compressed. The first pass, left to right, stores the running left product into `answer[i]` _before_ multiplying `nums[i]` in, so `answer[i]` ends up holding exactly the product of the prefix preceding `i`. The second pass, right to left, multiplies each `answer[i]` by a running right product that similarly lags one position behind, then absorbs `nums[i]`. After the two sweeps each cell holds prefix × suffix, which is the desired value.

The trick is that the intermediate prefix array is never needed all at once — each cell consumes the running product the moment it is produced, so a single scalar accumulator replaces the whole `pre` array, and a second scalar replaces `suf`. Apart from the output array (which by convention does not count), the only state is two integer accumulators, meeting the `O(1)` extra-space follow-up.

Zeros behave exactly as in the explicit-array version: a lone zero makes every cell zero except its own, where the two sweeps multiply the non-zero elements around it, and multiple zeros zero everything — all automatic, still without division.

**Complexity:** `O(n)` time, `O(1)` space beyond the output array.
