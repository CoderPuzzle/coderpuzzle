# Solutions — Subsequence After One Replacement

## Prefix and suffix match positions

Compute `pref[i]`, the first position in `t` that is available after matching
the prefix `s[0:i]`, and `suf[i]`, the earliest start position for matching
the suffix `s[i:]`. If `s` is already a subsequence, return true.

For each replacement index `i`, the prefix and suffix must match exactly, and
there must be at least one unused character of `t` between them. That
character can be used for the replacement because any lowercase letter is
allowed. The arrays are built with two linear scans.

**Complexity:** `O(|s| + |t|)` time, `O(|s|)` space.
