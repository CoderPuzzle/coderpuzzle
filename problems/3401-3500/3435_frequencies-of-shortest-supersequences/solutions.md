# Solutions — Frequencies of Shortest Supersequences

## Subset Enumeration with DAG Feasibility Check

Since every word has length exactly 2, each letter in a shortest common supersequence appears at most twice: if a letter occurred three times, the middle copy could be deleted while every two-letter subsequence requirement `a...b` still holds. So an SCS is fully described, up to which letter frequencies matter, by choosing for each of the `m <= 16` distinct letters whether it appears once or twice. Letters that appear in a word of the form `"aa"` are forced to appear twice — those bits are collected in a `forced` mask that every candidate must contain.

For a fixed choice of doubled letters, when can a supersequence with exactly those multiplicities exist? Doubled letters are never a problem: one copy can sit early and one late, so any word touching a doubled letter is satisfiable. The only obstruction is among letters appearing once each — a string containing one copy of each such letter embeds every word `ab` between them exactly when the directed graph of those words admits a topological order, i.e. is acyclic. So feasibility reduces to: delete the doubled letters from the word graph and run cycle detection (DFS with visiting/done coloring). Self-loops are already handled by the forced mask.

The algorithm enumerates all `2^m` masks, skips masks missing a forced bit or whose induced graph has a cycle, computes the candidate length `m + popcount(mask)`, and builds the 26-entry frequency vector (2 for bits in the mask, 1 otherwise). It keeps every vector attaining the minimum length. Because different masks can yield identical frequency vectors only when they are the same mask on the same letter set (vectors are built from the mask), duplicates are removed by a final sort-and-dedupe pass for safety.

Edge cases: disjoint letters with no constraints between them (example 3) give a single multiset answer; mutually inverted pairs like `"ab"` and `"ba"` (example 1) each need one letter doubled and yield two answers; when both orders already exist, doubling either letter works but produces frequency vectors that are permutations only when the letters coincide — hence the explicit dedupe of identical vectors only (example 2 keeps one vector because both SCSs have the same letter counts).

**Complexity:** `O(2^m * (m + E))` time, `O(m + E)` space (beyond the returned list), where `m <= 16` distinct letters and `E <= 256` words.
