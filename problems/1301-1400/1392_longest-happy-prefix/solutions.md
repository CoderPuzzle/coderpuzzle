# Solutions — Longest Happy Prefix

## KMP prefix function

A happy prefix is a proper prefix of `s` that is also a suffix — exactly the quantity the Knuth-Morris-Pratt prefix function computes. `pi[i]` is the length of the longest proper prefix of `s[0..i]` that is also a suffix of it, so the answer is simply the prefix of length `pi[n - 1]`, returned as `s[:pi[-1]]` (empty when that length is 0).

The table is built in one left-to-right pass with an auxiliary pointer `j`, the length of the current prefix-suffix match. When `s[i] == s[j]` the match extends by one. When it breaks, instead of restarting from scratch, `j` falls back to `pi[j - 1]`: the failed match of length `j` means the border of length `pi[j - 1]` (a prefix-suffix of the current matched block) is the next-longest candidate that could still extend. The `while` loop chases these fallbacks until a character agrees or the candidate empties. Because `j` increases at most once per position and each fallback strictly decreases it, the total work is linear.

The value `pi[n - 1]` is guaranteed to be a proper border (never equal to `n`), so the "excluding itself" rule holds automatically. Overlapping prefix and suffix — as in `"ababab"`, where `"abab"` overlaps — is inherent to the definition and needs no special handling.

Edge cases: a string with no repeated border gets `pi[n - 1] = 0` and the empty string is returned; strings of length 1 trivially have no proper prefix. The table itself is the only allocation.

**Complexity:** `O(n)` time, `O(n)` space.
