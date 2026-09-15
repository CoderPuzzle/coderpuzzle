# Solutions — Word Pattern

## Two hash maps, one pass

The definition names its own data structure. "Each letter in `pattern` maps
to exactly one unique word" is a forward map from letters to words, and "no
two letters map to the same word" is that same contract read backwards — a
reverse map from each word back to its claiming letter. Neither map alone is
enough: forward-only accepts `abba` against `dog dog dog dog`, where every
letter does keep one word but `a` and `b` share it, and reverse-only accepts
`aaaa` against `dog cat dog cat`, where every word keeps one letter but `a`
names two of them.

Before any mapping happens, `s` is split on its single spaces — the
constraints promise exactly one space between words and none at the ends —
which yields one word per letter to walk. A count mismatch settles the
answer `false` on the spot, since letters and words that cannot be paired
one-to-one can never form a bijection. The pass then feeds both maps
together: if the forward map already binds a letter to a different word, or
the reverse map already binds a word to a different letter, the pairing is
impossible right there; otherwise both directions record the pair. When the
pass ends, every pair has checked out in both directions at once.

The forward map holds at most 26 entries, one per letter, but the reverse
map stores the words themselves, so its space follows the length of `s`
rather than the alphabet. The walk touches each word once and stops at the
first conflict — which can hide at the very last position, so the worst
case still reads everything.

**Complexity:** `O(n)` time, `O(n)` space.
