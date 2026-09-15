# Solutions — Similar RGB Color

A shorthand color is one of only `16³ = 4096` possibilities: each channel
is a doubled hex digit, one of `0x00, 0x11, …, 0xff`. The similarity is a
sum of three independent per-channel squares, so the search factors — the
best shorthand for the whole color is the best repeated digit for each
channel on its own, and per channel only sixteen values need comparing.

## Nearest repeated digit per channel

For a channel value `v` the repeated-digit candidates are `17·d` for
`d = 0..15`, spaced 17 apart, so the nearest is the digit
`d = (v + 8) / 17` in integer arithmetic: adding half the gap before
dividing lands on the closer bracketing candidate. Because the spacing is
odd, no integer channel value is ever exactly halfway between two
candidates — the nearest is strictly unique per channel, the three
choices never interact, and the whole answer is unique; the statement's
same-similarity tolerance never has a second answer to accept.

The code walks the three channel pairs, parses each as one hexadecimal
byte, rounds to the nearest multiple of 17 with the same formula, and
emits that digit twice. `"#09f166"` rounds `0x09 → 0x11`, `0xf1 → 0xee`,
`0x66 → 0x66`, giving `"#11ee66"`.

**Complexity:** `O(1)` time, `O(1)` space.
