# Solutions — Restore IP Addresses

## Three cuts, depth-first

An address is nothing more than a way of cutting `s` into four consecutive pieces, so the search is a tree: the depth is which segment is being placed, and the children of a node are the possible lengths of the next segment, which can only be 1, 2, or 3. A depth-first walk that appends a segment, recurses on the rest of the string, then removes the segment again visits every way of placing the three cuts exactly once, and a leaf that has consumed the whole string joins its four segments with dots into one address.

Not every piece is a legal segment: it must be 0-255, and it may not have a leading zero unless it is exactly `"0"`. The length-3 candidates are the only ones the numeric check can reject, and the leading-zero rule costs one character comparison per candidate. One window prune keeps the walk from descending into dead ends: whatever digits remain must feed 1 to 3 of them to each segment still missing, so a remainder outside that window returns immediately — at zero segments left the same test accepts only a fully consumed string, which is why the leaf check needs no separate length comparison.

The children are visited shortest first, and since a dot sorts before every digit, an address whose next segment is shorter precedes any address that extends that digit instead — the walk therefore emits the addresses already in the ascending lexicographic order the statement pins, with no explicit sorting. The tree is bounded by the four-segment shape: at most 3⁴ root-to-leaf paths exist, each built from at most the whole string.

**Complexity:** `O(3⁴ · n)` time, `O(n)` auxiliary space excluding the output.
