# Solutions — Number of Segments in a String

## Count segment starts in one pass

A segment is a maximal run of non-space characters, so it has exactly one
first character: a non-space that either sits at index 0 or arrives right
after a space. Counting segments is therefore counting beginnings — every
other non-space position merely continues the run it belongs to and needs
no bookkeeping of its own.

The method applies that single condition in one left-to-right pass.
Leading, trailing, and repeated interior spaces need no special handling:
inside a run of spaces only the position just after it can qualify, an
empty or all-space string offers no qualifying position at all, and the
running tally is already the answer the moment the scan ends.

Splitting the string on spaces reaches the same number, but it pays for a
temporary list holding every word. The boundary scan keeps only the
counter, which is what makes the pass constant-space.

**Complexity:** `O(n)` time, `O(1)` space.
