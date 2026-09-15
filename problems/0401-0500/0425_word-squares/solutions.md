# Solutions — Word Squares

## Backtracking with a Prefix Map

In a word square, row k and column k must spell the same string. So once the first k rows are placed, the next word is heavily constrained: its first k characters are already fixed — they are the characters sitting in column k of the rows placed so far. The search therefore never guesses freely; at each depth it only needs the words starting with one specific prefix.

To make that lookup cheap, the code first builds a map from every prefix of every word (including the empty prefix and the full word) to the list of words having it. All words share the same length `n`, so a square always has exactly `n` rows, and the recursion depth is bounded by `n` (at most 4 here).

The backtracking routine carries the partial square: at depth `col = len(square)` it joins the column-`col` characters of the rows so far into the required prefix, pulls the candidate words from the map, and recurses with each appended. A square of size n is recorded as one result. Because candidates are fetched by exact prefix, any branch that cannot extend is pruned the moment no word matches the forced prefix — vastly smaller than enumerating permutations of the word list. The final list is sorted so output order is deterministic.

The prefix check is also complete, by symmetry: placing row `col` with a matching length-`col` prefix verifies exactly the conditions `square[j][col] == square[col][j]` for every earlier row `j`, and each pair is checked exactly once — when the later of its two rows is placed. The first row is unconstrained, which the map handles through the empty-prefix bucket, and reusing a word is allowed since each word lists itself under all of its prefixes.

**Complexity:** `O(N * L^2 + N^L)` time in the worst case (prefix map construction plus a search tree of depth L over N words; far less in practice thanks to prefix pruning), `O(N * L^2)` space.
