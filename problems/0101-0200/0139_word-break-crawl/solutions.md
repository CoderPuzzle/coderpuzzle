# Solutions — Word Break

One question, two ways to ask it. Either walk the cut points in order and
record which of them are legal, or treat them as nodes and search outward from
the start. Both hang on the same fact: a cut point is legal when some earlier
legal cut point is separated from it by a single entry.

## Bottom-up DP over prefix reachability

Segmenting `s` decomposes along its prefixes: `s` splits into dictionary words exactly when some word ends at the last position and everything before that word also splits. So `reachable[i]` records whether the first `i` characters form a sequence of dictionary words; `reachable[0]` is true because the empty prefix costs nothing, and `reachable[n]` is the answer. Each position is settled once, so the overlapping segmentations that make plain recursion exponential — every way of splitting a run of `"a"` into `"a"` and `"aa"` re-derives the same suffixes — collapse into one table pass, and reused words need no bookkeeping: `"applepenapple"` simply reads `"apple"` out of the set at both of its positions.

To decide position `i`, the code asks which dictionary words could end there. A hash set of the words answers membership, and iterating only the _distinct word lengths_ — at most 20 under the constraints — keeps the inner loop small no matter how large the dictionary grows: for each length `L` with `reachable[i - L]` set, one slice comparison tests whether `s[i-L:i]` is a word, and the first hit marks `reachable[i]`. Lengths are scanned in ascending order so the loop stops as soon as `L` exceeds `i`. `"catsandog"` fails exactly here: `"dog"` ends the string, but it needs the prefix `"catsan"` to be reachable, and no dictionary word lands there.

**Complexity:** `O(n · D · L)` time with `n = |s|`, `D ≤ 20` distinct word lengths and `L ≤ 20` the longest word — at most about 120,000 character comparisons at the constraint ceiling — and `O(n)` space beyond the word set.

## Trie walk over the wordDict

The DP pays for every word that could end at a position, even when the
word's first letter has already ruled it out. A trie lets the wordDict
do that ruling itself: all the words share one prefix tree, each node
owning children keyed by letter plus a flag on every node where a word
ends. Building it is one root-to-leaf insertion per word — walk the
word's letters from the root, creating missing children as they appear,
and set the flag on the final node.

The reachability sweep is then a walk per reachable position. Reading
`s` left to right, each position already marked reachable starts at the
root and consumes `s[i], s[i+1], ...` while the current node has a
matching child, stopping at the first character no remaining word
shares; because a walk only ever marks positions after its own start,
one pass settles every position. No candidate list is enumerated and no
slices are cut — a dead branch costs a single lookup. `"hophophop"`
repeats the same three-node `h-o-p` descent from each of its reachable
positions, and the walk from position 8 of `"railroadcar"` follows `c`,
`a`, `r` down `"carrot"`'s spine and then runs out of string, so no
terminal is crossed, `reachable[11]` is never set, and the answer is
false.

**Complexity:** `O(T + n · L)` time with `T` the wordDict's total
letters and `L ≤ 20` the longest word — one insert per letter builds the
trie and every reachable position walks at most `L` single-character
steps — and `O(T)` space for the trie plus `O(n)` for the table.
