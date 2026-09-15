# Solutions — Number of Substrings Containing All Three Characters

## Counting per right endpoint via last-seen indices

Count substrings by their right endpoint. A substring `s[l..i]` contains all of `a`, `b`, `c` exactly when the window `s[l..i]` covers the most recent occurrence of each of the three letters. So while scanning left to right, keep `last[0..2]` — the index of the last occurrence of `a`, `b`, and `c` seen so far, initialized to `-1`. After processing position `i`, the substring is valid precisely when its left endpoint `l` is at or before the oldest of those three occurrences, i.e. `l <= min(last)`.

Every valid left endpoint in `[0, min(last)]` yields one valid substring ending at `i`, so the scan adds `min(last) + 1` to the total at each step. Summing over all `i` counts every qualifying substring exactly once, because each substring is attributed to its own right endpoint. Before all three letters have appeared, `min(last)` is `-1` and the contribution is correctly zero.

Updating is a single array write when `s[i]` is one of the three letters (the string is guaranteed to contain only `a`, `b`, `c`), and the running minimum over three values is constant work, so the whole pass is linear.

Edge cases: strings shorter than needed or with a missing letter contribute nothing and fall out of the `-1` initialization, and the full-string case is covered at the final index. Only a fixed three-slot array is used besides the input.

**Complexity:** `O(n)` time, `O(1)` space.
