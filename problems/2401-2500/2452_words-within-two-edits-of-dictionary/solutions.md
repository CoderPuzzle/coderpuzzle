# Solutions — Words Within Two Edits of Dictionary

## Pairwise Hamming comparison

All words have the same length, and one edit replaces a single letter with any
other, so the minimum number of edits between a query word and a dictionary
word is exactly the number of positions where their letters differ — the
Hamming distance. A query is kept precisely when some dictionary word has
Hamming distance at most 2, and the hints point straight at this brute force.

The code walks the queries in order and, for each one, walks the dictionary
until a word within distance 2 is found; the query is then appended to the
result and the inner loop stops early. Comparing two words is a single pass
over their positions, counting mismatches and stopping once the count passes
2 (the comparisons here count all positions, which is at most 100 anyway).
Because each query is decided independently, the answer preserves the order of
`queries` by construction.

The cost is the product of the three sizes — number of queries, number of
dictionary words, and word length — with constant extra memory apart from the
returned list.

**Complexity:** `O(m * d * n)` time, `O(1)` extra space, where `m` is the
number of queries, `d` the number of dictionary words, and `n` the word
length.
