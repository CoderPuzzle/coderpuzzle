# Solutions — Find Longest Special Substring That Occurs Thrice I

## Brute-force tally of special substrings

With `s.length` at most 50 there is no need for anything cleverer than
enumeration. Every special substring is determined by its start index and its
length, and extending a candidate past the end of its run of equal characters
is the only way it stops being special, so a double loop that walks each start
index rightward while the character repeats visits each special substring
exactly once — at most `50 × 50` visits in total.

Each visited substring is tallied in a hash map keyed by the substring itself,
so occurrences of the same special substring in different runs of the same
character (for example the two separate `"aa"` blocks of `"aabbaa"`) land in
the same bucket. A final sweep over the map keeps the longest key whose count
reached three, falling back to `-1` when no bucket did.

Counting distinct substrings by content rather than by run arithmetic is what
keeps the argument short: "occurs at least thrice" is literally the map
lookup, with no window-overlap bookkeeping to reason about.

**Complexity:** `O(n²)` time, `O(n²)` space.
