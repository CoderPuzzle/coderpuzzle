# Solutions — Stream of Characters

## Trie of Words with a Suffix Node Trail

A query must decide whether any **suffix** of the whole stream so far equals a
dictionary word — the match can start at any past position, so checking each
suffix independently re-walks overlapping text. The `StreamChecker` class
turns the bookkeeping into trie state: it builds a trie of the words as given,
flagging the node where each word ends, and maintains a **trail of trie
nodes** — exactly one per stream position where a word might still be forming,
namely the node reached by the suffix that started there.

Each `query(letter)` advances the entire trail one edge labeled `letter`. A
node lacking that edge is a start that has diverged from every word — it is
dropped permanently, since no future character can revive it. The root is
added to the trail unconditionally, so the newest character always begins a
fresh candidate. The answer is whether any node reached by this letter —
never the root itself, words being non-empty — carries a word-end flag. The
trail's size is bounded by the longest word's length, because a candidate
that has matched `L > max_word_length` characters can no longer equal any
word.

Construction inserts each word, marking its terminal node. Both the Python and
Java canonical solutions implement exactly this structure (`dict` children
with a `"#"` end marker; `HashMap` children with a `word` flag). With at most
`2000 * 200` characters of dictionary and `4 * 10⁴` queries advancing a trail
of at most `200` nodes, every query is bounded constant work.

**Complexity:** `O(L)` per `query` (`L` = longest word length; the trail never
exceeds it), `O(total word characters)` build and space.
