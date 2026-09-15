# Solutions — Number of Integers With Popcount-Depth Equal to K II

## Six Fenwick trees over popcount-depth classes

The first observation is that the popcount chain of any value in range is
very short. A value up to `10¹⁵` has at most 50 bits, so its first
popcount is at most 50; from there the chain passes through small numbers
(50 → 3 → 2 → 1 at worst), which bounds the depth by 4 — depth 5 is
actually unreachable in this domain, although a query may still ask for
`k = 5`. Computing a depth is therefore a handful of `popcount` steps, and
each array element only ever carries one of six possible depths.

That turns the dynamic version of the counting problem into six
independent Fenwick trees, `fenw[0]` through `fenw[5]`, where `fenw[d]`
stores a 1 at index `i` exactly when the current `nums[i]` has depth `d`.
A type-1 query is a single prefix-difference on `fenw[k]`
(`query(r + 1) - query(l)`), and a type-2 update removes index `idx` from
the tree of its old depth and inserts it into the tree of the new depth —
two point updates. Every operation is an iterative `O(log n)` walk, which
also keeps the recursion depth at zero; counts never exceed `n`, so the
32-bit answers are safe while the values themselves (`10¹⁵`) and the
update payloads ride in 64-bit integers.

**Complexity:** `O((n + q) log n)` time, `O(n)` space.
