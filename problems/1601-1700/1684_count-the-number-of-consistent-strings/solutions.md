# Solutions — Count the Number of Consistent Strings

Consistency does not care how long a word is, how often a letter repeats, or
in what order the letters arrive — only which of the 26 lowercase letters the
word uses. That turns each word into a subset of the alphabet, and the
consistency question into a subset test against the letters of `allowed`. A
set of at most 26 letters fits in the bits of one integer, and a subset test
between two such integers is a single AND.

## One 26-bit mask per set of letters

Fold `allowed` into an `allowedMask` where bit `i` is set when the letter
`'a' + i` may appear. Then, for each word, fold its letters the same way into
a `mask`. The word is consistent exactly when `mask` holds no bit outside
`allowedMask` — that is, when `mask & ~allowedMask == 0`: `~allowedMask`
marks every letter `allowed` forbids, so the AND is nonzero precisely when
the word touches at least one forbidden letter. Equivalently
`mask | allowedMask == allowedMask`; pick either reading, the check is one
machine operation either way.

The complement trick needs no cleanup in any language here. `~allowedMask`
flips all 32 bits of a fixed-width integer, but `mask` can only ever set
bits 0 through 25 — there is no 27th letter for a word to contribute — so
the stray high bits never survive the AND. Java, C++, Go (`&^` is its
built-in AND-NOT), and Rust (on `u32`) are all safe as written, and Python's
arbitrary-precision `~` is exact by the same reasoning. A word may report
its verdict the moment a foreign letter is seen, but every word is at most
10 characters, so the straight fold is already linear and stays the simpler
shape.

Counting is then a single pass: start at zero and add one for every word
whose AND is zero. Duplicated words each count on their own, an `allowed`
holding the whole alphabet makes every AND zero by construction, and the
count can never exceed `words.length <= 10⁴`, far inside the 32-bit range.
The only state is the pair of masks.

**Complexity:** `O(n * L + |allowed|)` time, `O(1)` extra space.
