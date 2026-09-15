# Solutions — Minimum Length of String After Operations

## Count each letter down to one or two

Every operation picks a pivot copy of some letter and erases the closest
same-letter copy on either side, so one operation removes exactly two
copies of a single letter while the pivot itself survives. Deleting in
pairs can never change how many copies of a letter remain modulo two:
each letter's count keeps its parity for the entire process.

The reduction rule follows from what a legal operation requires. A letter
with three or more copies always has a usable pivot — take its second
copy in left-to-right order, and whatever other letters sit between,
one same-letter copy lies on either side. Pairs therefore keep coming
off until only one copy (odd count) or two copies (even count) remain,
and nothing can push below that floor: a letter down to one or two
copies offers no pivot, and removing two from three leaves exactly one.
Operations never mix letters, so each letter is independent — the
minimum final length is the sum over distinct letters of 1 for an odd
original count and 2 for an even one.

One sweep over `s` fills the 26 counters; a second sweep adds 1 or 2
for every letter actually present.

**Complexity:** `O(n)` time, `O(1)` space.
