# Solutions — Maximum Students Taking Exam

## Row-by-row bitmask dynamic programming

Because students only see along their own row and the diagonal seats of the adjacent row in front, a seating plan can be built row by row: what matters when placing row `i` is only which seats of row `i - 1` are occupied. Encode each row's placement as an `n`-bit mask (bit `c` set means a student sits in column `c`), and let `dfs(i, prev_mask)` be the maximum number of students placeable from row `i` onward given the previous row's mask. The answer is `dfs(0, 0)`.

Not every mask is legal for a given row: it must avoid broken seats (`'#'`) and avoid two adjacent students within the row. These constraints depend only on the row's furniture and `n <= 8`, so for each row the solution precomputes the list of admissible masks by testing all `2^n` candidates once. During the DP, a candidate mask for row `i` additionally conflicts with `prev_mask` if a seated column `c` faces a seated column `c - 1` or `c + 1` in the row above; admissible, non-conflicting masks contribute `mask.bit_count() + dfs(i + 1, mask)`, and the recursion takes the maximum.

The state space is at most `(number of rows) x 2^n` and each state enumerates that row's admissible masks, so memoization via `lru_cache` collapses the exponential overlap. With `m, n <= 8` the whole computation is tiny; the within-row admissibility filter already discards masks with adjacent students, which is why the per-row lists are far shorter than `2^n` in practice.

Edge cases: rows that are entirely broken contribute a single admissible mask (the empty one), contributing zero students, and a single-row classroom is handled naturally because the initial `prev_mask` of `0` conflicts with nothing.

**Complexity:** `O(m * n * 4^n)` time, `O(m * 2^n)` space.
