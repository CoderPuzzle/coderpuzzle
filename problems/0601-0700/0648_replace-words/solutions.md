# Solutions — Replace Words

Both approaches lean on the same pin: a word is replaced by the shortest
root that opens it, so the real work is finding the shortest prefix of the
word that lands in the dictionary. The root set runs that search one length
at a time, hashing each candidate prefix in ascending order until one hits —
the first hit is the answer by construction. The trie instead builds the
roots into a letter tree once and puts the same question to a single walk
along the word's own letters: the path descends the word's prefixes
shortest-first, so the first root it completes is the shortest one, with no
length ever retried.

## Root set, ascending prefix scan

Load the dictionary into a hash set, so testing whether a string is a root
costs one lookup. A derivative is then found by scanning its prefixes from
length 1 upward: the first prefix that lands in the set is the shortest root
forming the word — ascending order settles the shortest-root tie rule by
itself, with no comparison bookkeeping. A word whose prefixes all miss keeps
itself, which is exactly the replace-nothing case; the output is the words
joined back with single spaces.

No root is longer than 100 letters, so the scan stops there: a longer prefix
could not equal any root, and the cap keeps a 1000-letter word from paying for
prefixes no root can match. A trie of the roots would walk each word once
instead, but the set scan is simpler and, at these bounds, just as fast.

**Complexity:** `O(W * L²)` time — `W` sentence words each testing up to
`L = min(word, 100)` prefixes, every test hashing a prefix of its own length
(~5·10⁶ hashed characters at the 10⁶-letter sentence ceiling) — and
`O(D + S)` space for the root set (`D` total dictionary letters) and the
rebuilt sentence (`S` its length).

## Root trie, single prefix walk

Insert every root into a trie before touching the sentence: each node holds
a child slot per letter and an `end` flag marking that some root stops
exactly there. Replacing a word is then one walk along the word's own
letters, descending from the trie root. Every letter descended extends the
current prefix by one, so the walk visits the word's prefixes in ascending
length order, and the first `end` node it reaches sits at the end of the
shortest root opening the word — the walk's shape enforces the tie rule on
its own, with no length loop and no comparison bookkeeping.

Two other endings leave the word standing for itself: the next letter finds
an empty child slot, meaning no root continues that prefix, or the word runs
out of letters before any `end` was crossed. No length cap is needed: a root
is at most 100 letters, so the tree has no paths deeper than that and a
longer word's walk dies on its own.

**Complexity:** `O(D + S)` time — `D` total dictionary letters build the
trie once, then each of the sentence's words is walked a single time along
its own letters (`S` the sentence's length) — and `O(D)` space for the
trie's nodes.
