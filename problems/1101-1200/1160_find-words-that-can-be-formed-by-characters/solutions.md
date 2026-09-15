# Solutions — Find Words That Can Be Formed by Characters

## One letter-count table for chars, compared per word

`chars` is a multiset of letters, and a word is formable exactly when its
own letter counts fit under the multiset's counts — order is irrelevant, and
each copy in `chars` can serve one letter of one word (the budget resets
per word, since the letters are not consumed across words).

The code counts `chars` once into a 26-slot table, then for each word counts
its letters the same way and compares slot by slot; the word's length joins
the total only when every requirement fits. Counting a word costs at most
100 steps, so the whole run is linear in the input size, and the tables are
plain fixed-size arrays.

**Complexity:** `O(C + W)` time for `C = |chars|` and `W` the total length
of all words — every character is counted once — and `O(1)` extra space
beyond the input (two 26-entry tables).
