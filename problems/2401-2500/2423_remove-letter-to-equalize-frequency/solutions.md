# Solutions — Remove Letter To Equalize Frequency

## Try Each Letter Removal

Only the 26 letter counts matter, so the whole decision fits a fixed-size
frequency array. The removal candidate is always "one occurrence of some
present letter" — which specific index is irrelevant, since equal letters
are interchangeable. That gives hint 1's brute force directly: try each
of the (at most 26) present letters, decrement its count, and check
whether every still-positive count is the same value. Each trial is an
`O(26)` scan collecting distinct positive values into a set, so the total
is a bounded `26 × 26` work regardless of word length.

Two details keep the check honest. Zeros must be filtered before the
equality test — letters absent both before and after the removal are not
"present in `word`" and carry no constraint. And an empty survivor set
(after deleting the last copy of the only letter) is treated as trivially
equal, matching the note that exactly one removal happens no matter what.

The decrement/restore loop mutates one shared array instead of rebuilding
counts per candidate, keeping allocation constant. With `word.length <=
100`, all counts fit comfortably in 32-bit integers in every language.

**Complexity:** `O(26 · n + 26²)` time, `O(26)` space.
