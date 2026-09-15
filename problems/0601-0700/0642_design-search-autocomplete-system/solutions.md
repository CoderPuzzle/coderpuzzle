# Solutions — Design Search Autocomplete System

## Trie with Hot Degrees and a Walking Cursor

The system must answer, after every keystroke, "which historical sentences lie
below the current prefix?" — and must also learn the sentence the user
finishes. Storing a prefix-to-matches table for every prefix of every sentence
multiplies storage by sentence length; a **trie** shares that structure: each
sentence is stored once, and the node reached after `k` characters is exactly
the state of the `k`-character prefix.

The `AutocompleteSystem` class builds the trie at construction, keeping each
sentence's hot degree at the node where the sentence ends. As characters
arrive, a cursor node descends one edge per character (`input` is a single
character per call, threaded through the constructor-built root). When an edge
is missing the prefix matches nothing: the cursor latches onto a dead state and
every subsequent character returns an empty list — but the typed characters are
still buffered, because a `#` must record the whole sentence.

The match list itself is a depth-first walk from the cursor collecting
`(sentence, hotness)` pairs; sorting by descending hotness and ascending ASCII
order, then cutting after three, yields the required ranking. A `#` returns an
empty list, inserts the buffered sentence along the trie (creating nodes as
needed), increments its hot degree, and resets cursor and buffer — so the very
next sentence typed can climb the rankings in the same session.

Both the Python and Java canonical solutions implement exactly this structure.
With at most `100` sentences of length at most `100` and `5000` input calls,
each call walks a trie of at most `10⁴` nodes once, staying far inside the
limits.

**Complexity:** `O(T)` per `input` for the subtree collect (`T` = total
characters below the cursor) plus the sort of the matches, `O(T)` trie space.
