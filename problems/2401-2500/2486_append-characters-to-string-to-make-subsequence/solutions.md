# Solutions — Append Characters to String to Make Subsequence

## Greedy prefix match

Appending characters only ever extends `s`, so the part of `t` that can be
matched for free is some prefix — once a character of `t` is skipped, every
later one must be appended. The task is therefore to find the longest
prefix of `t` that is already a subsequence of `s`, and the answer is the
length of `t` minus that prefix.

Scanning `s` left to right with two pointers, one into each string, finds
that prefix greedily: whenever the current characters agree, both pointers
advance, and on a mismatch only the `s` pointer moves. This is optimal
because matching a character of `t` as early as possible can never hurt —
the remaining characters of `s` are the same either way, and the pointer
into `t` ends up no further back than any other strategy could manage.

The unmatched tail of `t` is exactly the characters that must be appended
to the end of `s`, so the method returns `len(t) - j` after the scan. Each
character of `s` is visited at most once, and the scan stops as soon as `t`
is exhausted.

**Complexity:** `O(|s| + |t|)` time, `O(1)` space.
