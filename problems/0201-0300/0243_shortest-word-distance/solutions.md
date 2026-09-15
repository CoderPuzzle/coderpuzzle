# Solutions — Shortest Word Distance

## One pass, last positions

Only the positions where `word1` and `word2` sit can matter, so a single walk that remembers the most recent index of each word sees every pair it needs: whenever a fresh occurrence of either word arrives, the closest opposite occurrence to it is the latest one already behind the scan point — anything older lies strictly farther back and can never produce a smaller gap. The method keeps `index1` and `index2` as those latest positions and, once both are known, folds `abs(index1 - index2)` into `best` at every step; `best` starts at the list length, which no real answer can reach because the two words occupy distinct indices, and each step can only shrink it.

The contract does the rest of the work. `word1 != word2` is guaranteed, so no element can match both words at once — the `if / else if` updates at most one position per element and "most recent" stays truthful — and both words are guaranteed present, so both indices become set before the walk ends. Nothing is precomputed and nothing is stored beyond two integers, which is what separates this problem from its repeated-query variants: here the list is seen exactly once, so building index lists or a map up front would cost a full pass for nothing.

Concretely, for the second example `word1 = "makes"` and `word2 = "coding"`: `"makes"` lands at indices 1 and 4, `"coding"` at index 3. At index 3 the gap is `abs(3 - 1) = 2`; at index 4 `"makes"` refreshes `index1` and the gap tightens to `abs(4 - 3) = 1`, the answer. The earlier `"makes"` at index 1 never needs revisiting — the newer occurrence at 4 is closer to every later `"coding"`.

**Complexity:** `O(n)` time, `O(1)` space.
