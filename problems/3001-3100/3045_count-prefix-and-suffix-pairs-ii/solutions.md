# Solutions — Count Prefix and Suffix Pairs II

## Paired-Character Trie

The quadratic pairwise scan of the easy version cannot survive 10⁵ words, so
the counting moves into a trie built while sweeping the array once.

The trie is not indexed by single characters. Walking a word `w` feeds the
trie the pairs `(w[j], w[len(w) - 1 - j])` — first character paired with last,
second with second-last, and so on. A node at depth `d` on `w`'s path then
records agreement of the first `d` and the last `d` characters of `w`
simultaneously, which is exactly the statement that some word ending at that
node is both a prefix and a suffix of `w` of length `d`. Each node carries the
number of earlier words that terminate there, so inserting `w` reduces to
following (creating, where missing) its pair path and adding every node's
counter to the answer on the way down, finally incrementing the counter at the
full-depth node. The walk is a single combined query-then-insert pass, because
the counters are only updated after the descent.

The answer is a count of index pairs, up to `C(10⁵, 2) ≈ 5 × 10⁹`, so it needs
a 64-bit accumulator (JavaScript numbers stay exact below 2⁵³). Node counters
themselves never exceed the word count.

**Complexity:** `O(T)` time for `T` total characters (each character spawns
one hash-map lookup), `O(T)` space for at most `T` trie nodes.
