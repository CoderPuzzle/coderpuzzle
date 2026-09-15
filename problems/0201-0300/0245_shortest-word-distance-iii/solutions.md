# Solutions — Shortest Word Distance III

## One pass, last positions

The one-pass walk — remember the most recent index of each word and fold `abs(index1 - index2)` into `best` once both are known — still applies, but here `word1` and `word2` may be the same word, and that is the whole problem. With equal words the distance must be measured between two different occurrences of that one word, and the closest such pair is always a pair of consecutive occurrences: for occurrences `p < q < r` of the word, `abs(p - r)` strictly exceeds both `abs(p - q)` and `abs(q - r)`, so any pairing that skips an in-between occurrence loses. One loop covers both cases: on a fresh occurrence of `word1` it first copies `index1` into `index2` when the words are equal — the previous occurrence now plays the counterpart, so the compared gap is always between consecutive occurrences — and only then refreshes `index1`; unequal words keep the plain two-position behavior.

The rest of the contract does the remaining work. A fresh occurrence is closest to the latest occurrence already behind the scan point, so the single folded gap is the only candidate each new occurrence adds. The note's guarantee that the two words represent two individual words in the list is what makes the loop complete: with unequal words both indices become set, and with equal words the word appears at least twice, so `index2` receives a real predecessor. `best` starts at the list length, which no real answer can reach because the answer always separates two distinct indices.

Concretely, for the second example `word1 = word2 = "makes"`: `"makes"` lands at indices 1 and 4. At index 1 `index1` becomes 1 with `index2` still unset; at index 4 the old `index1` moves into `index2` and the gap `abs(4 - 1) = 3` is the answer. The first example, with `"makes"` versus `"coding"`, behaves like the simpler problem: gap 2 when `"coding"` at index 3 meets `"makes"` at index 1, tightened to 1 when `"makes"` reappears at index 4.

**Complexity:** `O(n)` time, `O(1)` space.
