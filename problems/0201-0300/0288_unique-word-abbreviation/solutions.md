# Solutions — Unique Word Abbreviation

## One abbreviation group per abbreviation, held as a set of words

The constructor makes a single pass over the dictionary and files every word
into a hash map from its abbreviation to the set of distinct words sharing
it. `isUnique` then restates the two-condition rule as one lookup: fetch the
group for the query's abbreviation and return true exactly when it is absent
— no word in the dictionary shares the abbreviation — or when it contains
nothing but the query itself, that is `group == {word}`.

The set, rather than a count or a single stored word, is what lets the rule
survive duplicates. A dictionary that lists "deer" twice still leaves the
group for "d2r" equal to `{"deer"}`: a word never collides with its own
repeats, so `isUnique("deer")` stays true, where a collision-count check
would wrongly see two. The same lookup answers the example's last call —
"cake" sits in `{"cake"}` alone because "card" abbreviates to "c2d", so the
word is unique against itself. An abbreviation is the first letter, the
number of letters between, and the last letter, with words of one or two
characters abbreviating to themselves; only a word's two ends are ever read,
so each insert is constant work.

The middle number pins the word's length, so two different words can share
an abbreviation only when they also agree on length and both end letters —
"deer" and "door" meet at "d2r", "dig" and "dog" meet at "d1g", and no word
of any other length can join either group. One- and two-character words
abbreviate to themselves and can therefore only ever be grouped with their
own copies, which is why `len(word) <= 2` needs no further care.

**Complexity:** `O(n)` construction (one constant-size key per word, built
from its ends); each `isUnique` in `O(1)`; `O(n)` space.
