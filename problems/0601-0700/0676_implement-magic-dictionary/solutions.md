# Solutions — Implement Magic Dictionary

Both designs index the dictionary once at load time so a query never
compares against every word, and both read the rule the same way: a stored
word qualifies when it differs from the query word in exactly one position
— zero differences is an unchanged word, which the rule rejects. The trie
spells the words down shared paths and answers structurally, descending
once and spending the single change on the way down; the length buckets
keep the words flat and bound every scan to the one bucket a character
change can ever reach — same-length words only.

## One-Mismatch Trie Descent

`buildDict` spells every word down a trie — 26 child slots per node
indexed by the letter, a flag marking that a complete word ends there —
and each buildDict REPLACES the previous tree, so a later call never
leaves stale paths behind. With the index in place the question moves
into the search: instead of gathering candidates, `search` hunts
for a path that spells the query word after exactly one letter is
rewritten on the way down.

The descent carries the query position and a one-change budget. At each
node it visits every child: the child holding the query's own letter
continues for free, and every other existing child continues only by
spending the budget — so a path that survives to the query's end has paid
for its one difference at a single, exact position. Landing also requires
the node's flag, which marks a complete stored word: that keeps a longer
word's prefix from answering a shorter query, while a query running past
a shorter word just finds no edge to follow. Arriving with the budget
unspent fails the same check — the query then equals some stored word
outright, and a word that was never changed does not count.

Same-length falls out of the structure instead of being arranged: every
edge consumes one query character, so only a depth-`L` node can end a
length-`L` query. The bill is the branch sweep — at each depth one free
child continues and up to 25 change-spending branches open, each then
pinned to exact letters — so a query touches about `L²` nodes however
many words share its length, a cost that no longer grows with the
dictionary at all.

**Complexity:** `O(Σᵢ |dictionary[i]|)` per `buildDict`; `O(A · L²)` per
`search`, with `L` the query word's length and `A` the 26-letter
alphabet — independent of the number of stored words; space is the trie
itself, `O(A · Σᵢ |dictionary[i]|)`.

## Length-Bucketed Mismatch Scan

`buildDict` groups the words by length into a map of buckets, replacing any
dictionary set earlier — a second call speaks only for itself, so `search`
never sees stale words. Grouping by length is the whole index: a word of a
different length cannot be reached by changing characters, so `search` starts
from the search word's length and looks nowhere else.

`search` walks that one bucket and, for each candidate, counts the positions
where candidate and search word disagree, abandoning the candidate as soon as
the count passes one. A candidate with exactly one differing position is
reachable by changing exactly that character, so the answer is true; matching
with zero changes never counts, because the word was not changed at all — the
rule demands exactly one. That is also why a search word taken verbatim from
the dictionary still returns true when some other word sits one change away:
the change is judged against every word, not just the one that already
matches.

Since a search only touches same-length words, each comparison runs over
identical lengths and the early exit caps the work per candidate at two
mismatches.

**Complexity:** `O(Σᵢ |dictionary[i]|)` per `buildDict`; `O(L · k)` per
`search`, with `L` the search word's length and `k` the number of stored words
of that length; `O(Σᵢ |dictionary[i]|)` space.
