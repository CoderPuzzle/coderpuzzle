# Solutions — Minimum String Length After Removing Substrings

## Stack, one pass

Scan `s` from left to right keeping a stack of characters that no removal
has consumed yet. When the incoming character `ch` forms "AB" or "CD"
together with the character on top of the stack, that pair is an occurrence
of a removable substring — pop the top and drop `ch`; otherwise push `ch`.
Whatever remains on the stack at the end survived every possible removal, so
its size is the answer.

The order of removals never matters, which is why one greedy pass suffices.
Two occurrences can never overlap: "AB" and "CD" share no letters, and an
"AB" cannot overlap another "AB" (it would need one character to be both 'A'
and 'B'). So removing one occurrence never destroys a different one — it can
only expose new pairs across the seam — and every maximal sequence of
operations terminates at the same irreducible string. The stack computes
that irreducible string directly: by induction, the stack always holds the
irreducible form of the prefix read so far, and the only new occurrence the
next character can create is the one ending at it, namely "AB" or "CD" on
the stack top.

**Complexity:** `O(n)` time, `O(n)` space.
