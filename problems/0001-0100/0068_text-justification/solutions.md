# Solutions — Text Justification

## Greedy packing, left-first even padding

The sweep has two phases. First, words are packed greedily: the current line keeps accepting words while its letters plus one joining space per gap still fit in `maxWidth`, and the first word that would overflow opens a new line. The constraint that no word is longer than `maxWidth` guarantees a fresh line can always admit its first word, so every word lands somewhere. Second, each packed line is rendered. The last line, and any line holding a single word, is left-justified — words joined by single spaces, all remaining padding pushed onto the tail.

Every other line is fully justified. Its gaps must absorb exactly `maxWidth` minus the letters on the line, so each gap receives `total / gaps` spaces and the leftmost `total % gaps` gaps receive one more: the evenest possible split, with the indivisible remainder assigned left to right so left slots are never narrower than right ones. A line's rendering depends only on its own words, so both phases read each word a constant number of times and no line is ever rescanned.

**Complexity:** `O(n · maxWidth)` time — proportional to the output itself, since each line is built once at its full width; `O(maxWidth)` auxiliary space beyond the returned lines.
