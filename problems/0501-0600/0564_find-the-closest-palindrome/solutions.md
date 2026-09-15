# Solutions — Find the Closest Palindrome

## Mirror the first half and its two neighbors

A palindrome is fixed by its first half: an `L`-digit palindrome is its half
`ceil(L/2)` digits long, mirrored back over the remaining `floor(L/2)`, and
nothing else — each half names exactly one palindrome of that width. So the
palindromes hugging `n` nearly share `n`'s own half: mirroring the half
itself, and the half ±1, yields at most three same-width palindromes, and any
other same-width palindrome sits at least two half-steps away, farther on its
side than the ±1 mirror already found. The ±1 step can leave the width —
`10…0` decremented, `9…9` incremented — and there the neighbors are of a
different width: `10^(L-1) - 1`, the all-9s number one digit shorter, and
`10^L + 1`, a 1 with zeros and a 1, complete the candidate set of at most
five. A half that shed a digit would only mirror onto leading zeros, which is
exactly the all-9s candidate's ground, so it is skipped rather than padded.

The scan takes the five candidates, drops the one equal to `n` itself — that
is the mirror when `n` is already a palindrome, as `12321` is — and keeps the
smallest distance `|candidate - n|`, ties to the smaller value. Ties are real
and structural: `100` sits 1 from both `99` and `101` and answers `99`, and
`1000000` sits 1 from `999999` and `1000001` for the same reason. No other
candidate can win: shorter palindromes never beat the all-9s number (the
largest below every `L`-digit value), longer ones never beat `10^L + 1` (the
smallest above them all), and both boundaries are in the set.

Every value in play fits a signed 64-bit integer with an order of magnitude
to spare: `n` is at most `10¹⁸ - 1`, the widest candidate is `10¹⁸ + 1`, and
no distance exceeds `9 × 10¹⁷ + 1`, against int64's `9.22 × 10¹⁸` ceiling —
so Java, C++, Go, and Rust carry the whole selection in `long` / `long long`
/ `int64` / `i64` (Python's integers are unbounded anyway). JavaScript and
TypeScript cannot follow: `Number` holds integers exactly only through
`2⁵³ ≈ 9 × 10¹⁵`, and both `n` and its candidates tower past it. Those two
keep every candidate a digit string — only the nine-digit half, comfortably
exact in a double, is stepped numerically — and compare by schoolbook string
subtraction, ordering values shorter-first then lexicographically, since
none of the strings carries a leading zero.

**Complexity:** `O(L)` time, `O(L)` space, where `L <= 18` is the digit length.
