# Solutions — Sorting Three Groups

## Sweep once keeping a trio of best subsequence lengths

Removing elements and keeping elements are two views of one choice: if k
elements stay behind and already read as non-decreasing, exactly n − k
operations were spent, so minimizing removals equals maximizing the kept
non-decreasing subsequence. Because every value lies in {1, 2, 3}, such a
subsequence is simply some run of 1s followed by some run of 2s followed by
some run of 3s — which is also why Hint 2's three-way split [0, i), [i, j),
[j, n) covers every possibility: any optimal survivor fits that shape.

Scan nums once carrying three counters — the longest non-decreasing
subsequence seen so far that ends in a 1, in a 2, or in a 3. Element x can
be appended to any subsequence ending in a value ≤ x, so seeing a 1 raises
the first counter by one; seeing a 2 sets its counter to one plus the larger
of the 1- and 2-counters; seeing a 3 does the same against all three.
Updating only x's own counter is enough because every other counter already
holds its best over strictly earlier prefixes. The answer is n minus the
largest counter after the scan — Example 1's [2,1,3,2,1] ends with bests
(2, 2, 2), so 5 − 2 = 3 removals.

With n ≤ 100 the kept length, the removal count, and every intermediate lie
far below any overflow horizon (integers up to 100 versus signed 32-bit
bounds near 2·10⁹, JavaScript's Number exact past 2⁵³). The scan touches
each element once with constant work and no recursion, matching the O(n)
follow-up directly.

**Complexity:** `O(n)` time, `O(1)` space.
