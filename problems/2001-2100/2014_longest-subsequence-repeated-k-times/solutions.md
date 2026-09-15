# Solutions — Longest Subsequence Repeated k Times

## Quota-pruned candidate search

A character can appear in the answer at most `floor(frequency / k)` times, and the sum of those quotas is at most `floor(n / k)`, which is at most 7 under the constraints. Search candidates within these quotas, trying letters from `z` down to `a`. For every candidate, scan `s` once and count completed copies by restarting at the candidate's first character; this tests whether the candidate repeated `k` times is a subsequence without constructing the repeated string.

Recurse only when the current candidate passes that test, because every prefix of a valid extension must itself repeat `k` times. Compare every valid candidate with the best explicitly: prefer greater length, then lexicographically greater text, so the result does not depend on traversal order. If `C` quota-respecting candidates are checked, each check scans at most all of `s`.

**Complexity:** `O(C * n)` time, `O(26 + n / k)` auxiliary search space.
