# Solutions — Number of Unique Good Subsequences

## Linear DP on the Last Character

Counting unique subsequences by their exact string value suggests tracking, for each possible last character, how many _distinct_ good subsequence values end in it. Maintain `end0` and `end1`: the numbers of distinct good subsequences (as values) ending in `'0'` and `'1'` among the prefix processed so far, modulo `10^9 + 7`. The single string `"0"` is the only good subsequence allowed to have a leading zero, so it is tracked by a boolean flag and excluded from `end0`, which otherwise holds only values that begin with `'1'`.

When a new character `c` arrives, every existing good subsequence extended by `c` produces a distinct value ending in `c` (distinct extensions of distinct values are distinct), and every previously counted value ending in `c` is itself the extension of a shorter good value — so the old set is absorbed and the count simply becomes the total `end0 + end1`, plus 1 for the character standing alone when `c` is `'1'`. Hence `'0'` gives `end0 = end0 + end1` (the lone `"0"` is not added here, and extending `"0"` itself would create a leading zero), while `'1'` gives `end1 = end1 + end0 + 1`. Extending by `'0'` never creates a leading-zero problem because all counted values start with `'1'`.

After the scan, the answer is `end0 + end1`, plus one more if a `'0'` ever appeared, accounting for the lone `"0"`. Strings of all ones, all zeros, and any mixture are handled by the same two updates; there is no per-position casework beyond the branch on the current character.

**Complexity:** `O(n)` time, `O(1)` space.
