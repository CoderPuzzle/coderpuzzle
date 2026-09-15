# Solutions — Reformat The String

## Two queues and an alternating merge

Alternation is purely a matter of supply: the string can be rearranged
into a letter/digit/letter/… pattern exactly when the two groups differ
in size by at most one — any larger gap forces two equal-type neighbors
somewhere, and a gap of at most one is always fixable by starting with
the larger group. So the first step simply counts the two kinds and
compares.

When a rearrangement exists, the construction is a straight merge: walk
the original string once, appending each character to a letters list or a
digits list (both thereby keep first-occurrence order), then emit one
character per turn from whichever list currently leads — the larger list
first, the letters first on a tie — until both run dry. The smaller list
is consumed one step behind, so the last character always comes from the
larger group and no two same-type characters ever touch.

A single pass partitions and a second pass emits, so the work is linear
in the string length; at most 500 characters, no auxiliary structures
beyond the two lists.

**Complexity:** `O(n)` time, `O(n)` space.
