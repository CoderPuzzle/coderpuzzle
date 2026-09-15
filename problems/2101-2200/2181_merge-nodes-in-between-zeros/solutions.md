# Solutions — Merge Nodes in Between Zeros

## One pass with a running sum

Walk the list once past the leading 0, accumulating every value seen
into a running total; each 0 marks the end of a segment, so the total
becomes one result node and resets. A dummy head lets the first segment
be appended exactly like the rest, and the final 0 sentinel closes the
last segment naturally.

**Complexity:** `O(n)` time for `n` nodes, `O(1)` extra space beyond the
output list.
