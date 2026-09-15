# Solutions — Longest Alternating Subarray After Removing At Most One Element

## Run tables with a bridge merge

Build four run tables. `inc[i]` and `dec[i]` hold the length of the longest
alternating subarray ending at `i` whose last comparison is `<` and `>`
respectively, with `1` standing for the lone element `nums[i]`; `rinc[j]`
and `rdec[j]` mirror them for subarrays starting at `j`, classified by
their first comparison. Each table fills in one linear pass: alternation
forces the comparison sign to flip at every step, so a subarray extended by
a `<` step must grow out of one that ended with `>` — `inc[i] =
dec[i-1] + 1` when `nums[i-1] < nums[i]`, and symmetrically elsewhere.
An equal adjacent pair restarts both tables at `1`, since `==` continues no
chain. The best subarray that removes nothing is the maximum over
`inc`/`dec`.

Removing an element only helps when the selected subarray spans the removed
position, gluing a left part ending at `r-1` to a right part starting at
`r+1`; deleting an end element yields no spanning subarray, so only
interior `r` are tried. The bridge comparison `nums[r-1]` vs `nums[r+1]`
must alternate with the comparisons on both edges: when it is `<`, the left
part must end `>` and the right part must start `>`, giving the candidate
`dec[r-1] + rdec[r+1]`; when it is `>`, the candidate is
`inc[r-1] + rinc[r+1]`; when the two neighbours are equal, nothing bridges.
Taking the maximum of the no-removal answer and all bridge candidates
covers every way the one removal can be spent. Every table value and every
candidate is bounded by `n <= 10⁵` and elements fit comfortably in 32-bit
integers (JavaScript's doubles are exact far inside `2⁵³`), and all passes
are plain iterative loops, so no language needs deep recursion or wider
arithmetic.

**Complexity:** `O(n)` time, `O(n)` space.
