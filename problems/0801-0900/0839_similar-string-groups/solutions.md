# Solutions — Similar String Groups

## Union-Find over similar pairs

Because all strings are mutual anagrams, two of them are similar exactly when they differ in 0 or 2 positions: a single swap changes two positions, so 0 or 2 mismatches can be fixed with at most one swap, while 1 mismatch is impossible between anagrams and 3 or more require at least two swaps. The `similar` helper checks this with one linear scan that bails out as soon as a third mismatch appears.

Groups are the connected components of the graph with an edge between every similar pair — transitively connected words like "tars" and "arts" land in the same group even though they are not directly similar. Rather than building the graph, the code runs Union-Find directly on string indices: every similar pair `(i, j)` is unioned, with `find` applying path halving so repeated lookups stay nearly constant time. The answer is the number of distinct roots remaining, computed by collecting `find(i)` over all indices into a set.

With at most 300 strings, the all-pairs double loop is only about 45,000 similarity checks, each a short scan of words bounded by length 300, so the quadratic pairing is fast enough and no cleverer neighbor generation is needed.

**Complexity:** `O(N^2 · L)` time, `O(N)` space, for `N` strings of length `L`.
