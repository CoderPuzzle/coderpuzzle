# Solutions — Reverse Words With Same Vowel Count

## Split, filter by vowel count, rejoin

The simulation is a single linear pass over the words. Splitting `s` on
its single separators yields the word list without any index arithmetic;
the first word's vowel count is the target, and every word after it is
reversed exactly when its own count equals that target. Reversal is the
only mutation — the first word is never touched (it only defines the
target), non-matching words are left alone, and rejoining with single
spaces reproduces the original layout byte-for-byte because the
constraints guarantee no leading, trailing, or doubled spaces.

Counting vowels is itself a linear scan of each word testing membership
in `aeiou`, so the whole method does O(1) work per character: every
character is read a constant number of times (once for counting, and once
more only when its word is reversed). Nothing beyond the word list and
the result buffer is stored, so the extra space is linear in the input
length — unavoidable in languages whose strings are immutable, where the
rejoined result is a fresh buffer.

Two details are easy to get wrong and worth calling out. Splitting on the
empty separator (per-character) instead of the single space would
destroy word boundaries, and reversing the first word would break
inputs whose first word matches its own count — the statement reverses
only _following_ words.

**Complexity:** `O(n)` time, `O(n)` space.
