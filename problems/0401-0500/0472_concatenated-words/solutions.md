# Solutions — Concatenated Words

## Word-Break DP over a Hash Set

A concatenated word is one that can be segmented into at least two dictionary words, which is exactly the word-break question with an extra guard. The solution puts all words into a hash set and then tests every word independently with a segmentation DP: `dp[i]` is true when the prefix of length `i` can be split entirely into dictionary words, with `dp[0]` true for the empty prefix. For each end position `i`, it tries every start `j` and sets `dp[i]` as soon as some `dp[j]` is true and `word[j:i]` is in the set.

The crucial guard is skipping the split with `j == 0` and `i == n`: matching the whole word with itself would trivially mark every word as concatenated. With that case excluded, any successful segmentation must use at least two pieces, and since only proper substrings are ever looked up, pieces longer than the candidate can never match — the single set of all words is safe without any filtering by length. The inner loop also breaks at the first success for a position, since one valid split suffices.

Each word is tested in its original order, and only words whose DP reaches `dp[n]` are collected. Writing N for the number of words, L for the longest word length (at most 30), and S for the total character count, the `O(L^2)` position pairs per word (each with an `O(L)` slice-and-hash) stay cheap even for ten thousand words. The set dominates memory: it stores all input strings once, while the DP array is reallocated per word and never grows beyond 31 cells.

**Complexity:** `O(N·L^3)` time, `O(S)` space.
