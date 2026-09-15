# Solutions — Count Sorted Vowel Strings

## DP over the last vowel

Index the vowels `a, e, i, o, u` as `0..4` and let `dp[v]` hold the number
of sorted strings of the current length that end with vowel `v`. A
length-1 string trivially ends with each vowel exactly once, so the base
case is `dp = [1, 1, 1, 1, 1]`. To grow a string from length `i - 1` to
length `i`, any sorted string of length `i - 1` ending at vowel `v'` can
be extended by appending vowel `v` whenever `v' <= v` — appending never
decreases the last character, which is exactly the sorted property. So
the new count ending at `v` is the sum of the old counts over every
`v' <= v`, a running prefix sum over the vowel index.

The code keeps `dp` as a length-5 array and, for each of the remaining
`n - 1` positions, replaces it with its own prefix sums. After `n - 1`
such steps `dp[v]` holds the number of sorted length-`n` strings ending
with vowel `v`, and the answer is their total. This same recurrence is
also the standard "stars and bars" argument in disguise: choosing a
non-decreasing sequence of `n` vowels from 5 choices is equivalent to
distributing `n` indistinguishable picks across 5 categories, which
counts to `C(n + 4, 4)` — a fact this DP computes without ever needing
that closed form or risking overflow, since every intermediate value
stays a small count of strings.

**Complexity:** `O(n)` time, `O(1)` space.
