# Solutions — Valid Word Abbreviation

## Two pointers walking word and abbr together

The matcher keeps one index into `word` and one into `abbr` and advances them
together. A letter in `abbr` must equal the letter it lands on in `word`, or
the match fails on the spot. A digit is never matched against anything: its
whole run is read as one number, and that number advances the `word` index —
the replaced characters simply do not appear in the abbreviation.

The three rules of the game fall out of that walk directly. A run that opens
with `0` is rejected before it is parsed, which bans leading zeros and, with
them, zero-length replacements — `"s010n"` and the bare `"0"` die right there.
Adjacency needs no separate check at all: one digit run is one skip, so
`"s55n"` is read as a single 55-character skip, never as two adjacent 5s, and
against `"substitution"` it runs off the end of the word and fails exactly as
the rules demand.

The loop stops as soon as either index exhausts its string, and the answer is
true only when both end together: a skip past the end, leftover letters in
`word`, or leftover `abbr` after `word` is consumed all leave the two indexes
unequal. Each digit and each letter is touched once, and the whole check
carries nothing but the two indexes and the skip being parsed.

**Complexity:** `O(|word| + |abbr|)` time, `O(1)` space.
