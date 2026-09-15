# Solutions — Subsets

## Binary counting over position bitmasks

A subset is fully determined by which elements of `nums` it contains — one yes/no choice per
position — so the power set is exactly the set of bitmasks over positions `0..n-1`. Counting the
mask upward from `0` (all bits clear, the empty subset) to `2^n - 1` (all bits set, the whole
array) enumerates each subset exactly once, since distinct masks select distinct sets and the
elements are guaranteed unique. Counting upward is also the order the statement pins — it is the
order the example displays — so the mask loop emits the answer directly, with no post-sort of the
output.

Each subset is built by scanning the positions in input order and appending `nums[i]` whenever bit
`i` of the mask is set, so the elements inside every subset keep their input order. That is what
separates the pinned order from a sort by length or value: over `nums = [1,2,3]` the mask `011`
gives `[1,2]` before the mask `100` gives `[3]`, matching the example listing. The mask doubles as
the output position — the subset for mask `m` lands at index `m` of the result — so the loop
appends with no other bookkeeping.

The enumeration touches `n` bits for each of the `2^n` masks. With `n` capped at 10 that is at
most 1024 subsets, which is also the largest output the cases exercise — the full ceiling fits,
serializing to well under the judge's output budget.

**Complexity:** `O(n · 2^n)` time, `O(n)` auxiliary space excluding the output.
