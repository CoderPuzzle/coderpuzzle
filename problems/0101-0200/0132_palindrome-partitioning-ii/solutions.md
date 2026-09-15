# Solutions — Palindrome Partitioning II

## Cut DP with Center Expansion

Let `cut[i]` be the minimum cuts for the prefix of length i, with `cut[0] = -1` as a sentinel that makes a prefix which is itself one palindrome cost zero cuts. The recurrence takes the last piece of an optimal partition of `s[0..i)`: some palindrome `s[j..i)` closes it, so `cut[i] = min(cut[j] + 1)` over all valid j. Seeding `cut[i] = i - 1` — the all-single-characters fallback — gives every position its trivial upper bound before any relaxation.

Instead of an O(n^2) palindrome table, the code enumerates all 2n - 1 palindrome centers: odd-length palindromes expand from (c, c), even-length from (c, c + 1). Each expansion step that still matches exposes one palindrome `s[l..r]` for free and immediately relaxes `cut[r + 1]` with `cut[l] + 1`. Every palindrome is generated exactly once at its own center, so the full recurrence is applied without storing any table; processing centers left to right also means each `cut[l]` read during an expansion is already final, because every palindrome that improves `cut[l]` ends at index l - 1 and therefore has a strictly smaller center.

The two expansion loops do O(n^2) total work — O(n) centers, each expanding at most linearly far — which meets the follow-up's target of quadratic time while keeping only the O(n) cut array. A single-character string returns `cut[1] = 0`, and a string with no multi-character palindromes simply never relaxes anything below its seeded values.

**Complexity:** `O(n^2)` time, `O(n)` space.
