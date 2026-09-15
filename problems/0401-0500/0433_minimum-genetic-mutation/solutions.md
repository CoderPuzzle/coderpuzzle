# Solutions — Minimum Genetic Mutation

## Breadth-first search on the mutation graph

Treat the genes as an implicit graph: nodes are `startGene` plus the bank
entries, and an edge joins two genes that differ in exactly one of the 8
characters — one mutation is one edge. The bank rule carves the shape of
this graph by itself: every gene after the start must be a bank entry to be
valid, so no path may step outside the bank, and `startGene` needs no
membership — it is assumed valid. The minimum number of mutations is then
exactly the shortest path from `startGene` to `endGene`, which breadth-first
search measures layer by layer: the k-th frontier holds precisely the genes
k mutations away, so the first time `endGene` appears, its depth is the
answer.

Two rules fall out of the model before any search starts. If
`startGene == endGene`, zero characters have to change and no detour through
the bank can beat zero, so the answer is 0 whatever the bank holds. And
unless that already-equal case applies, `endGene` must itself be a bank
entry — a mutation sequence can only ever produce bank genes — so an absent
`endGene` means -1, which the search also reports naturally by exhausting
the frontier. Cycles in the graph (bank genes one character apart in both
directions) are harmless: each gene is marked visited when it is enqueued,
so it is expanded once no matter how many edges reach it.

The search itself never needs to build anything. Each frontier gene is
compared against every bank entry, counting differing positions; a count of
1 is an edge. That pairwise scan is `O(B² · 8)` and the graph is tiny — at
most 10 bank nodes, and from any gene at most 8 positions × 3 alternative
letters = 24 neighbors — so it finishes in microseconds. The classic
word-ladder alternative inverts the loop: generate all 24 neighbor genes and
probe a hash set of the bank for membership, and bidirectional search would
meet in the middle from both ends; both pay off only on the much larger
alphabets and word lists this problem's constraints rule out.

**Complexity:** `O(B² · 8)` time (`B` = bank size), `O(B)` space.
