# Solutions — Find Common Elements Between Two Arrays

Both answers are membership counts: `answer1` counts how often a value of
`nums1` appears somewhere at all in `nums2`, and `answer2` is the same
question with the arrays swapped. Multiplicities across the arrays are
irrelevant — a value is either present in the other array or it is not —
so the only state needed is the set of distinct values in each array.

## Membership sets, one pass per array

Collect `set(nums2)` and `set(nums1)` first, then `answer1` is the number
of indices `i` with `nums1[i]` in the first set, and `answer2` the number
of indices `i` with `nums2[i]` in the second. Each membership test is
constant time on average, so the whole method is one pass over each array
to build the sets and one pass over each to count.

With `n, m <= 100` and values at most `100`, even a nested pairwise scan
would finish instantly — the sets are not needed for speed at this scale.
They earn their keep by matching the semantics directly: existence, not
position or multiplicity, is what each answer counts, and a value seen
many times contributes once per occurrence without any special handling.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
