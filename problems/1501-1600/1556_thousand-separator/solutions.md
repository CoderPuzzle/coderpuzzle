# Solutions — Thousand Separator

## Group from the right

Converting `n` to its plain decimal digit string turns this into pure text
manipulation: walk the digits from the right in chunks of three and glue the
chunks back together with `.` between them, skipping the separator before
the leftmost (and possibly shorter) chunk.

A clean way to get exactly that grouping is to reverse the digit string,
slice it into runs of three characters, join those runs with `.`, and
reverse the joined result back. Reversing first means every chunk boundary
falls on a multiple of three counted from the units digit, which is exactly
where a separator belongs; reversing back restores the original digit order
with the dots now sitting in the right places. `n = 0` and any `n` under
1000 have four or fewer digits, so the single chunk needs no separator at
all — the slicing naturally produces just one piece.

**Complexity:** `O(d)` time, `O(d)` space, where `d` is the number of
decimal digits of `n`.
