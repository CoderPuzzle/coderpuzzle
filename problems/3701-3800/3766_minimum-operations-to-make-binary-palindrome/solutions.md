# Solutions — Minimum Operations to Make Binary Palindrome

Both approaches rest on the same pin: the answer for one value is decided
entirely by the closest binary palindrome below it and the closest one
above. Stepping past a nearest palindrome is never worth it, because any
farther palindrome is reached through that neighbor plus extra moves. The
approaches differ in how they find those two neighbors: one searches
outward from the value itself, the other builds every candidate the value
could land on and reads the distance off.

## Nearest Palindrome Walk

The definition, read literally: try offset `d = 0`, then `1`, then `2`, and
stop at the first offset where either neighbor is a binary palindrome.
Offset `d` costs exactly `d` operations in whichever direction works, so
the first hit is optimal by construction — no palindrome can be closer than
the first one the expanding search meets.

Each probe tests one string for the palindrome property with two pointers
walking inward from both ends; the first mismatch disqualifies it. Two
details keep the walk correct at the edges. The downward side stops at `1`,
because values below 1 have no binary representation without leading zeros
and are not legal targets — the statement's floor guarantees the upward
side always finds a home (`1`, `3`, `5`, ... are all palindromes). And the
two probes at one offset are independent: if the lower neighbor misses, the
upper one still gets its chance before the search widens.

How far can the walk run? Binary palindromes are dense enough that gaps
stay small — over this whole constraint range the widest gap between
consecutive palindromes is 96, so each value settles within a few dozen
probes of cheap string checks.

**Complexity:** `O(n · D · b)` time, `O(b)` space, where `b` is the bit
length of a value (at most 13 here) and `D` is the largest
palindrome-to-palindrome gap in range.

## Prefix Candidate Construction

A binary palindrome is completely determined by its first half of bits:
write down the first `ceil(b/2)` bits and mirror them around the middle,
and the whole string is fixed. That observation collapses the search to a
handful of constructed candidates instead of a scan.

For a `b`-bit value, read its first half `h`. Mirroring `h` gives the
palindrome sharing the value's high bits; mirroring `h - 1` and `h + 1`
gives the palindromes whose first halves sit just below and just above.
Any b-bit palindrome has one of these three first halves, so together with
two length-boundary forms — the largest palindrome with `b - 1` bits
(all ones), and the smallest with `b + 1` bits (`1 0...0 1`) — they cover
every palindrome that could possibly be nearest. One subtlety: when
`h - 1` drops its leading one it would describe a shorter string, not a
b-bit head, so it is skipped; the boundary forms already own that ground.
The answer is the smallest `|value - candidate|` among the survivors, with
no preprocessing and no per-value probing.

**Complexity:** `O(n · b)` time, `O(1)` extra space beyond the output.
