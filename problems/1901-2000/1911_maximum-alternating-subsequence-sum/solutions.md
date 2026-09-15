# Solutions — Maximum Alternating Subsequence Sum

## Even/odd two-state dynamic programming

Scan `nums` once while holding two running optima over subsequences of the
prefix: `even`, the best alternating sum of a subsequence whose last picked
element sits at an even reindexed position, and `odd`, the best with one extra
odd-position element. Both start at 0, the empty subsequence.

A new element `x` can extend a subsequence in either direction: appended after
an odd-ending subsequence it lands at an even position and is added, so
`even = max(even, odd + x)`; appended after an even-ending one it lands odd and
is subtracted, so `odd = max(odd, even - x)`. Because reindexing makes any
single element an even-position start, the two 0 seeds cover starting fresh,
and persisting each state covers skipping `x` entirely. The answer is `even`
after the final element.

Every value is at most `10⁵` and at most `10⁵` elements are ever summed, so all
intermediates are bounded by `10¹⁰` — beyond 32-bit range but far below `2⁵³`,
which keeps 64-bit integer types exact in every language and JS `Number` exact
as well.

**Complexity:** `O(n)` time, `O(1)` space.
