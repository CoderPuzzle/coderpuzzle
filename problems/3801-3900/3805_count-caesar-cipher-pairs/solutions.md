# Solutions — Count Caesar Cipher Pairs

## Rotation-normalized counting

Applying the operation k times adds k to every letter of the chosen word,
modulo 26, and shifting `t` forward by k is the same as shifting `s` backward
by k. So two words are similar exactly when a single uniform shift carries
one onto the other, which means a word's similarity class is captured by its
sequence of letter-to-letter differences. Subtracting each word's own first
letter from every character — the first character lands on `'a'`, each later
character records its offset from the start — maps every word of one class
onto the same normalized key, and words of different classes onto different
keys.

The code makes one pass over `words`, building that normalized key per word
and counting keys in a hash map. Two words form a similar pair exactly when
they share a key, so each class of `c` words contributes `c * (c - 1) / 2`
pairs, and summing over the map gives the answer. Nothing depends on the
words being distinct: duplicates just raise their class's count, and a lone
word or a set of pairwise-dissimilar words correctly yields 0.

The whole pipeline is a constant amount of work per input character, so with
`1 <= n * m <= 10⁵` it runs in linear time in the input size. The pair
total, though, is quadratic in `n`: all `10⁵` words may share one class
(every one-letter word does), giving `n * (n - 1) / 2 = 4,999,950,000`,
which overflows 32 bits — hence the 64-bit return, and in JavaScript the
per-class terms and the running total all stay below `2⁵³`, where doubles
are exact.

**Complexity:** `O(n·m)` time, `O(n·m)` space.
