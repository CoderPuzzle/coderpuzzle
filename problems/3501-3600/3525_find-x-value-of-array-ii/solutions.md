# Solutions — Find X Value of Array II

## Segment tree of prefix-product counts

After the update `nums[index] = value` and the forced removal of
`nums[0..start-1]`, the one operation chooses a suffix to delete, so the
remaining array is `nums[start..j]` for some `j >= start` — a query is
exactly the number of positions `j >= start` whose product
`nums[start..j] mod k` equals `x`. Products do not support division, so
range answers cannot be built from two endpoints directly; instead each
segment tree node stores a `k`-vector counting its segment's prefixes by
product remainder, plus the segment's total product.

Merging a left segment `L` and right segment `R` prepends `L`'s product to
`R`'s counts: a prefix of the union is a prefix of `L` unchanged, or
`L` followed by a prefix of `R`, shifting `R`'s count at remainder `p` into
`(L.prod * p) mod k`. A point update rewrites its leaf and recomputes the
path to the root; a query decomposes `nums[start..]` left to right,
accumulating the canonical nodes' counts while carrying the running product
of everything merged so far, and reads off bucket `x`. All stored values
are below `k <= 5` and all counts below `n`, so every intermediate fits
comfortably in fixed-width integers.

**Complexity:** `O((n + q log n) * k²)` time, `O(n * k)` space.
