# Solutions — Goat Latin

Every rule is local to one word: the first letter decides between keeping
the word intact and rotating that letter to the end, and the word's 1-based
index counts off the trailing 'a's. A single left-to-right pass over the
words therefore settles the whole sentence — nothing needs looking ahead or
behind, and the words are rebuilt independently.

## One pass, word by word

Split the sentence on spaces and walk the words with their indices. For each
word, test the first letter against the ten vowels in both cases — the
statement lists the lowercase five, and the first example opens with `'I'`,
so the test is case-blind. A vowel keeps the word as is; a consonant hands
its first letter to the end. The Goat tail is then `"ma"` followed by one
more `'a'` per the 1-based index, so the i-th word ends in exactly `i`
trailing 'a's — the third rule's "a, aa, …" ladder, built straight from the
enumeration index. Rejoin the rebuilt words with single spaces.

The constraints do half the work: single-space separation, no leading or
trailing spaces, so a plain split yields exactly the words, in order, with
no empties to filter. With `W` words the 'a'-ladder alone contributes
`1 + 2 + … + W = W(W + 1) / 2` characters, which dominates the output at
the word-count bound — the honest cost is quadratic in the word count even
though the pass itself is linear in `n`.

**Complexity:** `O(n + W²)` time, `O(n + W²)` space.
