# Solutions — Find All K-Distant Indices in an Array

## Merge the key occurrences' windows as they are scanned

Every occurrence of `key` at index `j` claims exactly the window
`[j-k, j+k]` (clipped to the array), and scanning left to right visits
those windows already sorted by their left ends. So keep one pointer to
the next index not yet emitted: each window contributes only its part past
that pointer, overlap handling becomes a single `max`, and no set or sort
is ever needed. The result is built in increasing order directly.

**Complexity:** `O(n)` time for an output of up to `n` indices, `O(1)`
auxiliary space beyond the output.
