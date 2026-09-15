# Solutions — Subsets II

## Sort, then backtrack with same-value skips

Sorting `nums` first settles both the deduplication rule and the output order at once. The search walks the sorted
values depth-first, extending the current subset from the first index not yet used, and records the subset the
moment each node is reached — the root of the walk is `[]`, and every deeper node is one subset longer than its
parent. Because each branch takes up copies of the smallest remaining value first, the subsets emerge in ascending
lexicographic order with ascending elements inside each one — exactly the order the statement pins — so the walk
emits the answer directly, with no post-sort of the output.

Duplicate subsets are suppressed by the sorted order rather than by a set. Within one loop over the candidate
indices, a value equal to the sibling just tried at the same level would rebuild the same subset through another
copy of that value, so runs of equal values are skipped: only the first copy of a run may open a branch. Equal
values still coexist inside a single subset — the deeper loop starts right after the copy just taken — only the
redundant branch at each level is cut.

One shared buffer is appended to before descending and popped after returning, so the bookkeeping stays linear in
`n`. With `n` capped at 10 the deduplicated power set is at its largest when every value is distinct (1024
subsets), and duplicates only shrink it, so even the ceiling serializes well under the judge's output budget.

**Complexity:** `O(n · 2^n)` time, `O(n)` auxiliary space excluding the output.
