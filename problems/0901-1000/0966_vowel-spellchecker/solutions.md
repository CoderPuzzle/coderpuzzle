# Solutions — Vowel Spellchecker

Every query is answered at the highest tier it reaches: an exact
case-sensitive match echoes the query, otherwise the first word equal up to
capitalization answers, otherwise the first word equal up to vowel errors,
otherwise `""`. Each of those relations is a string key, so one pass over the
wordlist folds all three into hash lookups — and the first-match-wins rule is
paid for once during that pass, because every map keeps the earliest wordlist
word registered under its key. With `C` the total number of characters across
the wordlist and the queries, the whole job is one sweep over those
characters.

## Three hash maps, one lookup per tier

The build sweep walks the wordlist in order and maintains a set of the words
themselves, a map from `lower(word)` to the first word stored under that key,
and a map from the devoweled form — `lower(word)` with every vowel replaced
by a placeholder — to the first word stored under that key. Insert-if-absent
is what encodes first-wins: a later case-variant or vowel-twin of an earlier
word never overwrites it, so by the time queries arrive, each key already
resolves to the word the statement's ordering demands.

Answering a query walks the tiers in precedence order: a hit in the exact
set echoes the query back; otherwise `lower(query)` is looked up; otherwise
its devoweled form is; otherwise the answer is `""`. Lowercasing before
devoweling makes tier 3 case-insensitive by construction. Consonants pass
through the devowel key untouched, which is exactly what the rule demands —
a query whose consonants differ anywhere can match nothing at tier 3, and
`'y'`, not being one of the five vowels, is just another consonant; words of
different lengths can never collide on a key either.

**Complexity:** `O(C)` time, `O(C)` space.
