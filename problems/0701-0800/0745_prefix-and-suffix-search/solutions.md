# Solutions — Prefix and Suffix Search

Both designs read the statement the same way: the dictionary is frozen at
construction while up to `10⁴` queries arrive, so the build buys the answers
and queries never look at the words again. The dual trie spreads each word's
index down two character trees — a prefix trie and a suffix trie over the
reversed words — and answers a query by walking both trees and intersecting
the two hit nodes' word lists. The pair hash compresses the same information
into one entry per (prefix, suffix) pair, where a query is a single lookup
with no walk and no intersection — the reason it stays the baseline the time
cost is measured against. Both enforce the tie rule without comparing words:
the trie by merging ascending index lists from their tails, the hash by
writing words left to right so later indices overwrite earlier ones.

## Two Tries, One Word List per Node

The layout is two tries: one spelling every word from its first letter, one
spelling every word's reverse, so any suffix reads down it front to back.
The only payload lives on the nodes — each carries the indices of all words
whose path crosses it, appended once per word per node as the words are
inserted. Since words are inserted in index order, every node's list is
ascending, and the whole structure holds `2·S·L` entries rather than the
`S·(L+1)²` of one entry per pair: shared beginnings and endings are stored
once, at the nodes the words share.

`f(pref, suff)` walks `pref` down the first trie and `suff` reversed
down the second. Either walk falling off its tree proves no word carries
that half, and `-1` answers immediately. Otherwise the two hit nodes hold
exactly the words with the wanted prefix and exactly the words with the
wanted suffix, and the answer is the largest index present in both lists.
That is one merge from the tails: the side currently holding the larger
index cannot have it matched by anything smaller on the other side, so that
side steps down, and the first equal pair encountered is the largest index
shared by both.

The trade is per-half matching breadth. The build is linear in the total
characters and shares common letters for free, but a query's merge grows
with the two hit lists — a one-letter prefix names a node holding every
word that starts with it, so early query characters can drag long lists
into the intersection. The pair hash pays its quadratic build to make that
breadth irrelevant: every query is one lookup no matter how many words
match each half. At this statement's scale — `10⁴` words of at most 7
letters — the lists stay short and the merge is cheap; the hash is the
design that stops caring altogether.

**Complexity:** `O(S·L)` build + `O(P + n₁ + n₂)` per query time, `O(S·L)`
space, for `S` words of length at most `L`, a query of combined length
`P = |pref| + |suff|`, and the two hit nodes' word lists of `n₁` and `n₂`
indices.

## One Hash Entry per Prefix and Suffix Pair

The dictionary is frozen at construction while up to `10⁴` queries arrive, so
the constructor spends one exhaustive pass buying constant-time answers for
all of them: for each word, at its index `i`, it pairs **every** prefix of the
word with **every** suffix of the word, joins the two through a `#` into one
composite key, and stores `i` under it. Words are lowercase letters only, so
`#` can never occur inside a prefix or a suffix — the join is unambiguous, and
`"ab#c"` can only mean prefix `"ab"`, suffix `"c"`. Because words are processed
left to right and a later word overwrites whatever an earlier word left under
a key, every entry settles on the largest index of any word that matches it —
exactly the tie rule the statement demands — with no comparisons and no
max-tracking anywhere.

A query then costs one lookup: glue `pref` and `suff` through the same `#` and
read the entry. An absent key means no word carries both that prefix and that
suffix, so `-1` is the map's own miss answer — nothing is scanned, and no
string comparison happens at query time at all; all of that work happened
once, during the build.

The cost is quadratic in each word's length but each unit is tiny. A word of
length `L` contributes at most `(L+1)²` keys of at most `2L+1` characters, so
at the statement's bound — `10⁴` words of length at most 7 — the map holds at
most `64 · 10⁴ = 6.4 × 10⁵` entries, which builds in a fraction of the limit
and fits comfortably in memory. Queries never touch the map's size.

**Complexity:** `O(S·L²)` build + `O(P)` per query time, `O(S·L²)` space, for
`S` words of length at most `L` and a query of combined length
`P = |pref| + |suff|`.
