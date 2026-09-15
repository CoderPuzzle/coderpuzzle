# Solutions — Number of Subarrays That Match a Pattern II

## Sign sequence and KMP

A window of `m + 1` consecutive elements is characterized entirely by the
comparisons between neighbors: define the sign sequence `s` of length
`n - 1` by `s[t] = 1` when `nums[t + 1] > nums[t]`, `0` when they are
equal, and `-1` when it is smaller. Condition `k` of the match definition
is then exactly `s[i + k] == pattern[k]`, so the window starting at `i`
matches if and only if `pattern` occurs in `s` as a contiguous block at
offset `i`. Counting matching windows therefore becomes counting
occurrences of `pattern` inside `s` — a substring search over an alphabet
of three signs.

The occurrences are counted with the Knuth-Morris-Pratt failure function,
built iteratively: `failure[k]` is the length of the longest proper prefix
of `pattern` that is also a suffix of its first `k + 1` entries. The scan
over `s` keeps `matched`, the length of the pattern prefix matched so far;
on a mismatch it falls back through `failure` instead of restarting, and
since each comparison either advances the text position or strictly lowers
`matched`, the total work stays linear. Each time the full pattern matches,
the count increments and `matched` drops to `failure[m - 1]`, which lets
overlapping occurrences — the dominant case on constant arrays — be counted
separately.

**Complexity:** `O(n + m)` time, `O(n)` space.
