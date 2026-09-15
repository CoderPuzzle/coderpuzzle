# Solutions — Sum of Sortable Integers

## Rotation check over every divisor

The blocks stay in their original positions while each is rotated
independently, so the final array is non-decreasing exactly when it equals
the unique sorted permutation of `nums`. That happens precisely when every
block can be rotated to match the slice of the sorted array that occupies its
positions. The problem therefore reduces to, for each divisor `k` of `n`,
checking whether each length-`k` block is a cyclic rotation of its sorted
counterpart.

Testing a single block needs linear time. A sequence is a cyclic rotation of
a block exactly when it appears as a contiguous slice of the block
concatenated with itself, so a KMP-style substring scan of `block + block`
locates the sorted target slice in `O(k)`. Doing that for all `n/k` blocks
keeps a whole divisor's check at `O(n)`.

Enumerating the divisors of `n` by trial division up to `sqrt(n)` and
running the rotation check for each keeps the method comfortably inside the
limits. The number of divisors of any `n <= 10⁵` is at most `128`, so the
total work is `O(n)` per divisor, i.e. `O(n * d(n))` overall.

**Complexity:** `O(n * d(n))` time, `O(n)` space.
