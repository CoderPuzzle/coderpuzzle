# Solutions — Sentence Similarity II

## Union-Find over Words

Similarity is symmetric and transitive, so the pairs define an undirected graph in which two words are similar exactly when they are identical or lie in the same connected component. Union-find is the natural machinery: `union` every entry of `similarPairs`, then answer each aligned word pair by comparing roots.

The length check comes first — sentences of different lengths can never be similar. For each position, identical words pass immediately; otherwise both words' roots must match. `find` registers unseen words on the fly, so words that appear only in the sentences and never in a pair become their own singleton components — such a word can therefore match only itself, which is exactly the required semantics. An empty `similarPairs` list leaves every word isolated and reduces the test to plain equality.

Path halving inside `find` keeps the structure flat, making each operation near-constant amortized. With `P` pairs, `N` words per sentence, and `W` distinct words overall, the algorithm is a linear pass over the pairs followed by a linear pass over the positions.

**Complexity:** `O((P + N) α(W))` time, `O(W)` space.
