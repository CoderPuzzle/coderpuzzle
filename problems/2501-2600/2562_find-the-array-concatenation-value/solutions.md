# Solutions — Find the Array Concatenation Value

## Two-pointer numeric folding

The simulation the first hint suggests never needs strings. Concatenating
`first` onto `last` is exactly `first · 10^digits(last) + last`, and
`digits(last)` comes from peeling decimal digits off a scratch copy of the
value with integer division. So two pointers walk from both ends toward the
middle: each round folds one concatenation into the running total and
removes both endpoints, and when the pointers finally coincide on an odd
length array, that survivor joins the total by itself — hint 3's trap.

Because every element stays below `10⁴`, each pair contributes less than
`10⁸`, and with at most 500 rounds plus a leftover middle the whole answer
is bounded near `5 · 10¹⁰`. That exceeds 32-bit range (Java, C++, Go and
Rust carry it in `long`/`long long`/`int64`) but sits comfortably below
JavaScript's exact-Number ceiling `2⁵³`, so no big-integer machinery is
required in any language.

**Complexity:** `O(n · d)` time where `d ≤ 5` digits per element — linear
in practice; `O(1)` extra space.
