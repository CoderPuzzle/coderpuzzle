# Solutions — Maximum Score Words Formed by Letters

## Backtracking over Word Subsets

The key observation is that `words.length` is at most 14, so there are at most 2^14 subsets of words — small enough to enumerate exhaustively. Choosing a subset fully determines the score, because a subset is valid exactly when the combined letter requirements of its words fit inside the available letters. So the problem reduces to searching all subsets for the valid one with the highest total score.

To make each decision cheap, the solution first preprocesses every word into a 26-entry count vector `need` plus its total `value` (the sum of per-letter scores). The available letters are likewise reduced to a 26-entry count array. During the search, checking whether a word can still be formed is a 26-element comparison, and taking it subtracts the word's counts and adds its value — no string work happens inside the recursion.

The DFS walks words by index. At each word it always explores the skip branch, and additionally explores the take branch only when `remaining` covers the word's `need` vector — an infeasible word simply prunes that subtree. Since any point in the search already represents a complete valid selection (the rest can be skipped), the running `total` is compared against `best` at every node rather than only at the leaves.

Edge cases fall out naturally: words whose letters are unavailable are skipped, zero-score words may be taken but never improve `best`, and if nothing can be formed the answer stays 0. Note that a zero-score word still consumes letters, so taking it can only hurt — but enumerating it anyway is harmless within the 2^n budget.

**Complexity:** `O(26 · 2^n)` time, `O(26 · n)` space, where `n` is the number of words.
