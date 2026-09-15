# Solutions — Encode and Decode Strings

## Length-prefixed chunks

Encoding walks the list once and emits `str(len(s)) + ":" + s` per string,
concatenating the pieces. The prefix names exactly how many characters belong
to its piece, so nothing inside a string can be mistaken for structure: a
colon, a run of digits, even a string that is itself a whole valid encoding —
`encode(["1:23", "4"])` is `"4:1:231:4"` — are all just characters that some
prefix has already counted.

Decoding is the mirror walk with a cursor. From the cursor it reads digits up
to the next colon — those digits are the decimal length, the colon merely ends
them — then slices exactly that many characters as one string and leaves the
cursor at the next length. The loop ends when the cursor reaches the end of
the input; every prefix is consumed and nothing is left over, so the two
methods are inverse by construction: whatever `encode` emits, `decode`
rebuilds character for character.

The empty string needs no special case — it is the piece `"0:"`, a zero
length and no content — and neither do multi-digit lengths: a 200-character
string simply prefixes `"200:"`, and the digit scan handles one, two, or
three digits identically.

**Complexity:** `O(n)` time, `O(n)` space per direction, where `n` is the
total number of characters encoded.
