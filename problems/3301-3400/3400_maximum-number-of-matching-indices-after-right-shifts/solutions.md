# Solutions — Maximum Number of Matching Indices After Right Shifts

Shifting `n` times restores `nums1`, so "any number of right shifts" means
some residue `k` in `0..n-1`, and with `n <= 3000` the whole space is at most
`9 × 10⁶` comparisons — small enough to simply measure every candidate.

## Sweep every shift, count matches in place

After `k` right shifts, the element originally at index `i` sits at
`(i + k) % n`, so the shifted array agrees with `nums2` at index `j` exactly
when `nums1[(j - k) % n] == nums2[j]`. Re-indexed, comparing `nums1[i]`
against the rotated view `nums2[(i + k) % n]` counts the matches of shift `k`
directly — nothing is ever copied or rotated. The sweep takes the maximum
over all `k` and stops early the moment a shift matches everywhere, since no
later shift can beat `n`.

The Python fragment runs the same comparison row at C speed by pairing
`map(operator.eq)` with the sliced rotation `nums2[k:] + nums2[:k]`, which
keeps the worst case (no early exit, `n = 3000`) far inside the time limit.
Values only ever get compared, never accumulated, so every language's native
integer width is irrelevant to correctness.

**Complexity:** `O(n²)` time, `O(1)` extra space (`O(n)` transient for the
sliced rotation in the Python fragment).
