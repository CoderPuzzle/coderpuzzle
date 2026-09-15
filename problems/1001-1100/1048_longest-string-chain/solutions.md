# Solutions — Longest String Chain

## DP by Deleting One Character

The search direction is the crucial choice: instead of trying to insert characters into shorter words, process each word and delete one character at a time, looking the shortened string up in a hash map of already-solved words. Because a predecessor is always one character shorter, sorting the (deduplicated) words by length guarantees that every possible predecessor of a word has been processed before the word itself, so a single pass suffices with no explicit graph.

The DP table maps each word to the longest chain ending at that word. For a word of length L, each of its L one-deletion variants is checked; the word's value is one more than the best value among variants present in the map, or 1 if none exist (a word alone is a valid chain). The answer is the maximum value recorded. Deleting at each position is what enforces the ordering constraint automatically — the predecessor is a subsequence-preserving deletion of the successor, exactly the definition of the relation.

Edge cases: duplicate words in the input are collapsed by the initial `set` so they cannot inflate counts (they also would not extend each other, since a word is not its own predecessor). A collection with no related pairs correctly yields 1. Each word does L slice-and-concatenation operations of length L, with short string comparisons against the map.

**Complexity:** `O(N log N + N·L²)` time, `O(N·L)` space, for N words of maximum length L.
