# Solutions — Letter Case Permutation

Every letter of `s` carries one independent binary choice — keep the case
`s` gives it, or flip it — while every digit is fixed. The answer is the
`2^L` strings those choices produce, `L` being the number of letters, and
the statement pins their order: each letter in its given case before the
flipped one, earlier letters varying slowest.

## Interleaved list-doubling

Grow the answer by scanning `s` from left to right, starting from a list
that holds just `[s]`. At each letter, every string already built is
immediately followed by a copy of itself with that one letter's case
flipped, so the list doubles in place; after `a1b2` meets its `a` the
list is `a1b2, A1b2`, and after it meets its `b` each of those two is
followed by its own second-letter flip. Each finished string traces a
unique path through the doublings, one keep-or-flip decision per letter,
so no string repeats and every combination appears. The
order falls out as the pinned one for free: an earlier letter was decided
by an earlier, coarser doubling, so its case varies slowest, and every
original precedes the copy it spawned.

The copy needs only one character replaced, and it is always the
character `s` itself has at the current position: the scan moves left to
right and step `i` only ever rewrites position `i`, so when the scan
reaches a letter, every string in the list still carries the original
character there. Flipping it is a plain ASCII toggle — `^ 0x20` on the
character code, which swaps exactly the case bit of an English letter and
never consults a locale table.

**Complexity:** `O(2^L · n)` time, `O(2^L · n)` space.
